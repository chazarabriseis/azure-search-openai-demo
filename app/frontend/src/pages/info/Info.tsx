import styles from "./Info.module.css";

export function Component(): JSX.Element {
    const itemsChat = [
        "Hält das eingestellte Thema im Gedächtnis",
        "Bietet passende Beispielfragen im Verlauf an",
        "Erlaubt vertiefende Gespräche und die schrittweise Kommunikation von Aufgaben",
        "Verwendet die PCS Wissendatenbank"
    ];

    const itemsQa = [
        "Bietet Antworten auf gestellte Fragen",
        "Ermöglicht die Verbesserung der Qualität und das Training der Wissensdatenbank",
        "Verwendet die PCS Wissendatenbank"
    ];

    const itemsQaDetail = [
        "Bietet detaillierte Antworten auf gestellte Fragen",
        "Ermöglicht die Verbesserung der Qualität und das Training der Wissensdatenbank",
        "Verwendet die PCS Wissendatenbank"
    ];

    const itemsMarketing = [
        "Erlaubt die Eingabe individueller Prompts zusammen mit Fragen",
        "Nutzer werden gebeten, hilfreiche Prompts für zufriedenstellende Ergebnisse zu notieren ",
        "Verwendet die PCS Wissendatenbank"
    ];

    const itemsChatGPT = [
        "Bietet geschäftsspezifische Fragen und Antworten Nutzung von ChatGPT innerhalb des Geschäftskontexts.",
        "Schützt sensible Daten vor externer Freigabe",
        "Verwendet NICHT die PCS Wissendatenbank"
    ];

    const itemsNotIncluded = [
        "Handbücher, Datenblätter etc. über abgekündigte Produkte",
        "Fachspezifische Dokumentationen außerhalb der PCS-Dokumente (Grundlagen Netzwerktechnik, Erstellung Marketingkampagne, umfangreiche juristische Grundlagen usw.)"
    ];

    const itemsIncluded = [
        "Handbücher, Datenblätter, White- & Bluepaper über aktuelle Produkte",
        "Aktuelle Preislistensammlung",
        "PCS-Wartungsverträge & allg. Infos für SaaS-Verträge",
        "Liste über Produktabkündigungen",
        "Toolbox für das professionelle Produktmanagement und -marketing",
        "PCS-Personas (INTUSnet)",
        "Werte der PCS (PCS-Homepage)",
        "Anleitungen zur Erstellung von Texte für Newsletter",
        "Pressemitteilungen, Reden, Websitetexte (Beispiele)",
        "Teile aus der INTUSnet-Wissensdatenbank von ID-Technologien & Support",
        "Handbuch „Einführung in Tcl/Tk 8.6“ von Oliver Scholl / 26.07.2022",
        "Beispiel für Use-Cases",
        "3 Studien: KPMG - Cloud Monitor 2023, pwc-customer-service-and-engagement, Deloitte - CustomerService",
        "Handbuch Erstellung Businessplan",
        "Innovationsmanagement-Präsentation inkl. Modelle wie Morphologischer Kasten, Business Modell CANVAS, Design Thinking"
    ];

    const chatPrompt =
        "Der Assistent hilft den Mitarbeitern der PCS bei Support Fragen von Kunden. " +
        "Beantworten Sie die Fragen NUR mit den Fakten, die in der Liste der Quellen unten aufgeführt sind. Wenn die Informationen unten nicht ausreichen, sagen Sie, dass Sie es nicht wissen. Geben Sie keine Antworten, die sich nicht auf die unten aufgeführten Quellen stützen. Wenn eine klärende Frage an den Benutzer hilfreich wäre, stellen Sie die Frage. " +
        "Für tabellarische Informationen geben Sie diese als html-Tabelle zurück. Geben Sie kein Markdown-Format zurück. Antworten Sie auf deutsch. " +
        "Jede Quelle hat einen Namen, gefolgt von einem Doppelpunkt und der eigentlichen Information; geben Sie immer den Namen der Quelle für jede Tatsache an, die Sie in Ihrer Antwort verwenden. Verwenden Sie eckige Klammern, um auf die Quelle zu verweisen, zum Beispiel [info1.txt]. Kombinieren Sie keine Quellen, sondern geben Sie jede Quelle einzeln an, z. B. [info1.txt][info2.pdf]. ";

    const qaPrompt =
        "Beantworte die Frage prägnant auf deutsch, verwende nur die Daten aus den unten aufgeführten Quellen. " +
        "Jede Quelle hat einen Namen, gefolgt von einem Doppelpunkt und der eigentlichen Information. Gib immer den Namen der Quelle für jede Tatsache an, die in deiner Antwort verwendet wird. " +
        "Wenn die Frage nicht anhand der unten aufgeführten Quellen beantwortet werden kann, sag dass du es nicht weißt. Verwende zur Beantwortung das folgende Beispiel: " +
        "Was ist der KP1 Satz? " +
        "Quellen: " +
        "info1.txt: Mit dem KP1 Satz können Terminals und Leser parametriert werden. " +
        "info2.pdf: Mit dem KP1 Satz kann das Türöffnungsprofil gesetzt werden. " +
        "info3.pdf: Es können Berechtigungen vergeben werden. " +
        "info4.pdf: Es können die Anzahl der Türen angepasst werder. " +
        "Der KP1 Satz ist ein Satz zur Parametrierung der Funktionalität des Terminals und jedes Lesers [info1.txt], wie zum Beipsiel das Erstellen einesTüroffnungsprofil [info2.pdf] und der Anzahl der Türen [info4.pdf].";

    const qaDetailPrompt =
        "Beantworte die Frage detailliert auf deutsch, verwende nur die Daten aus den unten aufgeführten Quellen. " +
        "Jede Quelle hat einen Namen, gefolgt von einem Doppelpunkt und der eigentlichen Information. Gib immer den Namen der Quelle für jede Tatsache an, die in deiner Antwort verwendet wird. " +
        "Wenn die Frage nicht anhand der unten aufgeführten Quellen beantwortet werden kann, sag dass du es nicht weißt. Verwende zur Beantwortung das folgende Beispiel: " +
        "Was ist der KP1 Satz? " +
        "Quellen: " +
        "info1.txt: Mit dem KP1 Satz können Terminals und Leser parametriert werden. " +
        "info2.pdf: Mit dem KP1 Satz kann das Türöffnungsprofil gesetzt werden. " +
        "info3.pdf: Es können Berechtigungen vergeben werden. " +
        "info4.pdf: Es können die Anzahl der Türen angepasst werder. " +
        "Der KP1 Satz ist ein Satz zur Parametrierung der Funktionalität des Terminals und jedes Lesers [info1.txt], wie zum Beipsiel das Erstellen einesTüroffnungsprofil [info2.pdf] und der Anzahl der Türen [info4.pdf].";

    const marketingPrompt =
        "Verwende für die Fragestellung NUR die Fakten, die in der Liste der Quellen unten aufgeführt sind. " +
        "Gebe keine Antworten, die sich nicht auf die unten aufgeführten Quellen stützen. " +
        "Jede Quelle hat einen Namen, gefolgt von einem Doppelpunkt und der eigentlichen Information. Gib immer den Namen der Quelle für jede Tatsache an, die in deinem Text verwendet wird. " +
        "Wenn der Text nicht anhand der unten aufgeführten Quellen erstellt werden kann, sag dass du es nicht weißt. Verwende zur Beantwortung das folgende Beispiel: " +
        "Erstelle einen Marketing Text zu den Vorteilen eines Hardwarechecks " +
        "Quellen: " +
        "info1.txt: INTUS Hardware ist zuverlässig. " +
        "info2.pdf: Da sich Technologien weiterentwickeln sollte die Firmware auf Sicherheitslücken geprüft werden. " +
        "INTUS Hardware für Zeiterfassung und Zutrittskontrolle ist bekannt für ihre Zuverlässigkeit [info1.txt]. In vielen Fällen sind INTUS Zeiterfassungsterminals und Zutrittskontrollmanager seit mehr als einem Jahrzehnt bei Kunden installiert.  Da sich Technologien und Sicherheitsstandards ständig weiterentwickeln, sollte von Zeit zu Zeit überprüft werden, ob die Firmware der eingesetzten Geräte noch den aktuellen Sicherheitsanforderungen entspricht und/oder neue Funktionen unterstützt[info2.pdf]. PCS empfiehlt, die Datenerfassungs- und Zutrittskontrollsysteme stets auf dem neuesten Stand der Technik zu halten, um eine optimale Funktionalität sicherzustellen.";

    const chatGPTPrompt = "Der Assistent chattet wie eine chatGPT Anwendung und ignoriert dabei die unten angegebene Quellen.";

    return (
        <div className={styles.oneshotContainer}>
            <div className={styles.oneshotTopSection}>
                <h1 className={styles.oneshotTitle}>Übersicht Hauptfunktionen</h1>
                <div className={styles.infoItem}>
                    <h2>Kontakt</h2>
                    <div className={styles.oneshotQuestionInput}>
                        <div className={styles.list}>
                            Ihr habt Fragen oder Feedback? Wir freuen uns über Verbesserungswünsche, Ideen für Weiterentwicklungen oder auch gerne positives
                            Feedback. Schreibt uns im
                            <a
                                href="https://teams.microsoft.com/l/team/19%3AacAmjJgbQGsHxTnww2vrHQJFG8R3h6JlMuxS5D2G3Sg1%40thread.tacv2/conversations?groupId=a21a980d-baa3-44fd-b48a-f522689ced8e&tenantId=dd089e65-09bc-4657-8ad6-0c1cb6181625"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                PCS-Athena KI
                            </a>
                            Teams Kanal oder meldet Euch bei LKlemets@pcs.com oder FWittmann@pcs.com.
                        </div>
                    </div>
                </div>
                <div className={styles.infoItem}>
                    <h2>Chat</h2>
                    <div className={styles.oneshotQuestionInput}>
                        <div className={styles.list}>
                            <ul>
                                {itemsChat.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.hinweis}>
                            Hinweis: Ihr könnt den Standard-Prompt für diese Funktion während Eurer eingeloggten Sitzung in den Einstellungen oben rechts
                            anpassen. Siehe dazu auch Tipps für die Formulierung eines Prompts. Der hinterlegte Standard-Prompt (wird bei jedem Login neu
                            geladen) und lautet:
                        </div>
                        <div className={styles.prompt}>{chatPrompt}</div>
                    </div>
                </div>
                <div className={styles.infoItem}>
                    <h2>Q&A</h2>
                    <div className={styles.oneshotQuestionInput}>
                        <div className={styles.list}>
                            <ul>
                                {itemsQa.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.hinweis}>
                            Hinweis: Der Standard-Prompt für diese Funktion kann während Eurer eingeloggten Sitzung in den Einstellungen oben rechts verändert
                            werden. Siehe dazu auch Tipps für die Formulierung eines Prompts. Der Default-Prompt (wird bei jedem Login neu geladen) und lautet:
                        </div>
                        <div className={styles.prompt}>{qaPrompt}</div>
                    </div>
                </div>
                <div className={styles.infoItem}>
                    <h2>Q&A Detail</h2>
                    <div className={styles.oneshotQuestionInput}>
                        <div className={styles.list}>
                            <ul>
                                {itemsQaDetail.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.hinweis}>
                            Hinweis: Der Standard-Prompt für diese Funktion kann während Eurer eingeloggten Sitzung in den Einstellungen oben rechts verändert
                            werden. Siehe dazu auch Tipps für die Formulierung eines Prompts. Der Default-Prompt (wird bei jedem Login neu geladen) und lautet:
                        </div>
                        <div className={styles.prompt}>{qaDetailPrompt}</div>
                    </div>
                </div>
                <div className={styles.infoItem}>
                    <h2>PM/MarCom</h2>
                    <div className={styles.oneshotQuestionInput}>
                        <div className={styles.list}>
                            <ul>
                                {itemsMarketing.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.hinweis}>
                            Hinweis: Der Default-Prompt ist sehr allgemein gehalten und weißt darauf hin dass die Daten aus der PCS Wissensdatenbank verwendet
                            werden sollen. In der Frage Euren Prompt anpassen, ob Ihr z.B. eine E-Mail, einen Insta-Post etc. möchtet. Der Default-Prompt (wird
                            bei jedem Login neu geladen) lautet:
                        </div>
                        <div className={styles.prompt}>{marketingPrompt}</div>
                    </div>
                </div>
                <div className={styles.infoItem}>
                    <h2>ChatGPT</h2>
                    <div className={styles.oneshotQuestionInput}>
                        <div className={styles.list}>
                            <ul>
                                {itemsChatGPT.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.hinweis}>
                            Hinweis: Der Default-Prompt weißt darauf hin, nicht die PCS Wissensdatenbank zu verwenden. Der Default-Prompt (wird bei jedem Login
                            neu geladen) lautet:
                        </div>
                        <div className={styles.prompt}>{chatGPTPrompt}</div>
                    </div>
                </div>
                <div className={styles.infoItem}>
                    <h2>Tipps für die Formulierung eines Prompts</h2>
                    <div className={styles.oneshotQuestionInput}>
                        <div className={styles.list}>
                            <a
                                href="https://pcscom.sharepoint.com/:b:/s/KIimSupport/ERxDeIfjdn9OvGGKIxxGP0ABizk3stTw3ajR3wH9g0RuIw?e=Cfaits"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                PCS Sharepoint
                            </a>
                        </div>
                    </div>
                </div>
                <div className={styles.infoItem}>
                    <h2>Bestandteil der in der KI hinterlegten PCS-Quellen (436 PDFs (Stand 31.01.2024))</h2>
                    <div className={styles.oneshotQuestionInput}>
                        <div className={styles.list}>
                            <ul>
                                {itemsIncluded.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.infoItem}>
                    <h2>Kein Bestandteil der in der KI hinterlegten PCS-Quellen:</h2>
                    <div className={styles.oneshotQuestionInput}>
                        <div className={styles.list}>
                            <ul>
                                {itemsNotIncluded.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.infoItem}>
                    <h2>Neue Quellen hinzufügen</h2>
                    <div className={styles.oneshotQuestionInput}>
                        <div className={styles.list}>
                            Falls Ihr weitere Dokumente habt, welche Ihr der PCS Wissensdatenbank hinzufügen möchtet, können wir diese gerne indizieren. Dazu
                            einfach das Dokument in{" "}
                            <span className="italic-word">"K:\Projekte\juba\Dokumente\Athena Datenquellen\neue oder aktualisierte Datenquelle"</span> ablegen
                            und im <span className="italic-word">PCS - AThena KI Team</span> im Kanal <span className="italic-word">Datenquellen</span> Bescheid
                            geben. Hier seht Ihr auch welche Datenquellen schon alle für Athena indiziert sind.
                        </div>
                    </div>
                </div>
                <div className={styles.infoItem}>
                    <h2>Funktionsweise</h2>
                    <div className={styles.oneshotQuestionInput}>
                        <div className={styles.list}>
                            Für die Athena KI haben wir kein neues Sprachmodell trainiert, sondern wir verwenden die Retrieval Augmented Generation (RAG) Logik:
                            Dem Sprachmodell (GPT-3.5-turbo) wird zusammen mit deiner Frage Textabschnitte, aus denen die Antwort abgeleitet werden kann
                            mitgegeben. Die Textabschnitte werden basierend auf den Wörtern, die Sie in der Frage verwenden, aus der PCS-Wissensdatenbank
                            gezogen. Die fünf relevantesten Textabschnitte werden zusammen mit einem Prompt, der die Aufgabe beschreibt, und deiner Frage an das
                            GPT-3.5-turbo-Modell geschickt. Es liefert dann eine Antwort. Ein leicht abgeänderter Prompt kann zu sehr unterschiedlichen
                            Antworten führen. Deshalb formuliere die Fragen um, wenn du mit der Antwort noch nicht zufrieden bist, und gebe uns Feedback wie du
                            die Fragen stellst, um die besten antworten zu erhalten.
                        </div>
                        <div className={styles.list}>Weiterentwicklung von https://github.com/Azure-Samples/azure-search-openai-demo</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Component.displayName = "Info";
