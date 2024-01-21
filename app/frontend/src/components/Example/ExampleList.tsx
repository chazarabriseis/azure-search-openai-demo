import { Example } from "./Example";

import styles from "./Example.module.css";

const CHAT_EXAMPLES: string[] = ["Was ist der KP1 Satz?", "Wie viele Leser können am ACM40e angeschlossen werden?", "Wie binde ich via TCL ein Terminal an?"];

const CHATORIGINAL_EXAMPLES: string[] = [
    "Formuliere eine E-Mail an den Kunden: Der Kunde beschwert über fehlerhaftes Produkt und erwartet bis morgen eine Lösung. Er ist frustriert und droht mit Eskalation an die Geschäftsführung. Er erwartet eine schnelle Lösung für das Problem.",
    "Wie organisiere ich ein Projekt für die Einführung einer Software?"
];

const QA_EXAMPLES: string[] = [
    "Wie lautet die Bestellnummer für das I5200-Interfacemodul?",
    "Welche aktuellen RFID-Leseverfahren empfiehlt PCS?",
    "Was beinhaltet der präventive Wartungsvertrag? "
];

const MARKETING_EXAMPLES: string[] = [
    "Verfasse einen Fachartikel für eine Zeitschrift zum Thema Zutrittskontrolle. Betone dabei die aktuellen Entwicklungen, Herausforderungen und potenzielle Lösungen in diesem Fachbereich. Achte auf eine klare Struktur, wissenschaftliche Genauigkeit und präzise Formulierungen. Der Artikel sollte informativ sein und sich an ein Fachpublikum richten, das mit den grundlegenden Konzepten des Themas vertraut ist.",
    "Entwickle eine Reihe von praxisnahen Use Cases für das Thema Softwaremonitoring eines Zeiterfassungsterminalherstellers . Beschreibe detailliert die Anwendungsszenarien, die beteiligten Akteure, ihre spezifischen Aufgaben und die erwarteten Ergebnisse. Betone dabei die Mehrwerte und Vorteile der jeweiligen Use Cases. Berücksichtige mögliche Herausforderungen und präsentiere realistische Lösungsansätze. Ziel ist es, die Vielseitigkeit und Anwendbarkeit des Themas durch konkrete Beispiele zu veranschaulichen."
];

const GPT4V_EXAMPLES: string[] = [
    "Compare the impact of interest rates and GDP in financial markets.",
    "What is the expected trend for the S&P 500 index over the next five years? Compare it to the past S&P 500 performance",
    "Can you identify any correlation between oil prices and stock market trends?"
];

interface Props {
    onExampleClicked: (value: string) => void;
    useGPT4V?: boolean;
    tabName?: string;
}

export const ExampleList = ({ onExampleClicked, useGPT4V, tabName }: Props) => {
    const getExamplesArray = () => {
        switch (tabName) {
            case "chatgpt":
                return CHAT_EXAMPLES;
            case "chatgptoriginal":
                return CHATORIGINAL_EXAMPLES;
            case "qa":
                return QA_EXAMPLES;
            case "marketing":
                return MARKETING_EXAMPLES;
            default:
                return CHAT_EXAMPLES;
        }
    };

    return (
        <ul className={styles.examplesNavList}>
            {getExamplesArray().map((question, i) => (
                <li key={i}>
                    <Example text={question} value={question} onClick={onExampleClicked} />
                </li>
            ))}
        </ul>
    );
};
