import os
from typing import Any, AsyncGenerator, Optional, Union

from azure.search.documents.aio import SearchClient
from azure.search.documents.models import VectorQuery
from openai import AsyncOpenAI

from approaches.approach import Approach, ThoughtStep
from core.authentication import AuthenticationHelper
from core.messagebuilder import MessageBuilder

# Replace these with your own values, either in environment variables or directly here
AZURE_STORAGE_ACCOUNT = os.getenv("AZURE_STORAGE_ACCOUNT")
AZURE_STORAGE_CONTAINER = os.getenv("AZURE_STORAGE_CONTAINER")


class RetrieveThenReadMarketingApproach(Approach):
    """
    Simple retrieve-then-read implementation, using the AI Search and OpenAI APIs directly. It first retrieves
    top documents from search, then constructs a prompt with them, and then uses OpenAI to generate an completion
    (answer) with that prompt.
    This is used for the marketing tab.
    """

    system_chat_template = (
        "Bitte erstelle mir einen technisch fundierten Marketingtext zu gegeben Thema mit einer seriösen, kompetenten und gleichzeitig nahbaren Ansprache auf deutsch."
        + "Das PDF MBPW_Businessplan_Handbuch.pdf und MBPW_Businessplan_Handbuch.pdf erklären wie ein guter Marketing text aussehen soll."
        + "Verwende für den Inhalt NUR die Fakten, die in der Liste der Quellen unten aufgeführt sind."
        + "Gebe keine Antworten, die sich nicht auf die unten aufgeführten Quellen stützen. "
        + "Jede Quelle hat einen Namen, gefolgt von einem Doppelpunkt und der eigentlichen Information. Gib immer den Namen der Quelle für jede Tatsache an, die in deinem Text verwendet wird. "
        + "Wenn der Text nicht anhand der unten aufgeführten Quellen erstellt werden kann, sag dass du es nicht weißt. Verwende zur Beantwortung das folgende Beispiel"
    )

    # shots/sample conversation
    question = """
'Thema: Vorteile eines Hardwarechecks '

Quellen:
info1.txt: INTUS Hardwar ist zuverlässig. 
info2.pdf: Mit dem KP1 Satz kann das Türöffnungsprofil gesetzt werden.
info3.pdf: Es können Berechtigungen vergeben werden.
info4.pdf: Da sich Technologien weiterentwickeln sollte die Firmware auf Sicherheitslücken geprüft werden.
"""
    answer = "INTUS Hardware für Zeiterfassung und Zutrittskontrolle ist bekannt für ihre Zuverlässigkeit [info1.txt]. In vielen Fällen sind INTUS Zeiterfassungsterminals und Zutrittskontrollmanager seit mehr als einem Jahrzehnt bei Kunden installiert.  Da sich Technologien und Sicherheitsstandards ständig weiterentwickeln, sollte von Zeit zu Zeit überprüft werden, ob die Firmware der eingesetzten Geräte noch den aktuellen Sicherheitsanforderungen entspricht und/oder neue Funktionen unterstützt[info4.pdf]. PCS empfiehlt, die Datenerfassungs- und Zutrittskontrollsysteme stets auf dem neuesten Stand der Technik zu halten, um eine optimale Funktionalität sicherzustellen.  "

    def __init__(
        self,
        *,
        search_client: SearchClient,
        auth_helper: AuthenticationHelper,
        openai_client: AsyncOpenAI,
        chatgpt_model: str,
        chatgpt_deployment: Optional[str],  # Not needed for non-Azure OpenAI
        embedding_model: str,
        embedding_deployment: Optional[str],  # Not needed for non-Azure OpenAI or for retrieval_mode="text"
        sourcepage_field: str,
        content_field: str,
        query_language: str,
        query_speller: str,
    ):
        self.search_client = search_client
        self.chatgpt_deployment = chatgpt_deployment
        self.openai_client = openai_client
        self.auth_helper = auth_helper
        self.chatgpt_model = chatgpt_model
        self.embedding_model = embedding_model
        self.chatgpt_deployment = chatgpt_deployment
        self.embedding_deployment = embedding_deployment
        self.sourcepage_field = sourcepage_field
        self.content_field = content_field
        self.query_language = query_language
        self.query_speller = query_speller

    async def run(
        self,
        messages: list[dict],
        stream: bool = False,  # Stream is not used in this approach
        session_state: Any = None,
        context: dict[str, Any] = {},
    ) -> Union[dict[str, Any], AsyncGenerator[dict[str, Any], None]]:
        q = messages[-1]["content"]
        overrides = context.get("overrides", {})
        auth_claims = context.get("auth_claims", {})
        has_text = overrides.get("retrieval_mode") in ["text", "hybrid", None]
        has_vector = overrides.get("retrieval_mode") in ["vectors", "hybrid", None]
        use_semantic_ranker = overrides.get("semantic_ranker") and has_text

        use_semantic_captions = True if overrides.get("semantic_captions") and has_text else False
        top = overrides.get("top", 3)
        filter = self.build_filter(overrides, auth_claims)
        # If retrieval mode includes vectors, compute an embedding for the query
        vectors: list[VectorQuery] = []
        if has_vector:
            vectors.append(await self.compute_text_embedding(q))

        # Only keep the text query if the retrieval mode uses text, otherwise drop it
        query_text = q if has_text else None

        results = await self.search(top, query_text, filter, vectors, use_semantic_ranker, use_semantic_captions)

        user_content = [q]

        template = overrides.get("prompt_template") or self.system_chat_template
        model = self.chatgpt_model
        message_builder = MessageBuilder(template, model)

        # Process results
        sources_content = self.get_sources_content(results, use_semantic_captions, use_image_citation=False)

        # Append user message
        content = "\n".join(sources_content)
        user_content = q + "\n" + f"Sources:\n {content}"
        message_builder.insert_message("user", user_content)
        message_builder.insert_message("assistant", self.answer)
        message_builder.insert_message("user", self.question)

        chat_completion = (
            await self.openai_client.chat.completions.create(
                # Azure Open AI takes the deployment name as the model name
                model=self.chatgpt_deployment if self.chatgpt_deployment else self.chatgpt_model,
                messages=message_builder.messages,
                temperature=overrides.get("temperature") or 0.3,
                max_tokens=1024,
                n=1,
            )
        ).model_dump()

        data_points = {"text": sources_content}
        extra_info = {
            "data_points": data_points,
            "thoughts": [
                ThoughtStep(
                    "Search Query",
                    query_text,
                    {
                        "use_semantic_captions": use_semantic_captions,
                    },
                ),
                ThoughtStep("Results", [result.serialize_for_results() for result in results]),
                ThoughtStep("Prompt", [str(message) for message in message_builder.messages]),
            ],
        }

        chat_completion["choices"][0]["context"] = extra_info
        chat_completion["choices"][0]["session_state"] = session_state
        return chat_completion