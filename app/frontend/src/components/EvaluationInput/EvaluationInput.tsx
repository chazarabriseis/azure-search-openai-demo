import { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { Stack, TextField, IconButton } from "@fluentui/react";
// import { Button, Tooltip, Field, Textarea } from "@fluentui/react-components";
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownStyles } from "@fluentui/react/lib/Dropdown";

import { AnimalTurtle16Filled, Send28Filled } from "@fluentui/react-icons";
import { useLogin, getToken, isLoggedIn, requireAccessControl } from "../../authConfig";
import { ChatAppResponse, appendToBlobApi } from "../../api";

import styles from "./EvaluationInput.module.css";
import { to } from "@react-spring/web";

interface Props {
    disabled: boolean;
    question: string;
    answer: ChatAppResponse;
}

const client = useLogin ? useMsal().instance : undefined;

const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } };

const dropdownCorrectnessOptions = [
    { key: "ja", text: "Ja" },
    { key: "teils", text: "Teils" },
    { key: "nein", text: "Nein" }
];

const dropdownGeraetOptions = [
    { key: "intus com", text: "INTUS COM" },
    { key: "tpi", text: "TPI" },
    { key: "tcl", text: "TCL" },
    { key: "terminal", text: "Terminal" }
];

const dropdownBenefitsOptions = [
    { key: "1", text: "Suchaufwand in interner Doku erspart." },
    { key: "2", text: "Rücksprache mit Kollegen erspart." },
    { key: "3", text: "Rücksprache mit Experten erspart." },
    { key: "4", text: "Sonstiges, siehe unten:" }
];

export const EvaluationInput = ({ disabled, question, answer }: Props) => {
    const [showInfo, setShowInfo] = useState(false);

    const { instance } = useMsal();
    const disableRequiredAccessControl = requireAccessControl && !isLoggedIn(instance);

    const [user, setUser] = useState<string>("");

    const onUserChange = (_ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        if (!newValue) {
            setUser("");
        } else if (newValue.length <= 1000) {
            setUser(newValue);
        }
    };

    const [correct_answer, setCorrectAnswer] = useState<string>("");

    const onCorrectAnswerChange = (_ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        if (!newValue) {
            setCorrectAnswer("");
        } else if (newValue.length <= 1000) {
            setCorrectAnswer(newValue);
        }
    };

    const [handbuch, setHandbuch] = useState<string>("");

    const onHandbuchChange = (_ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        if (!newValue) {
            setHandbuch("");
        } else if (newValue.length <= 1000) {
            setHandbuch(newValue);
        }
    };

    const [anmerkung, setAnmerkung] = useState<string>("");

    const onAnmerkungChange = (_ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        if (!newValue) {
            setAnmerkung("");
        } else if (newValue.length <= 1000) {
            setAnmerkung(newValue);
        }
    };

    const [sonstiges, setSonstiges] = useState<string>("");

    const onSonstigesChange = (_ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        if (!newValue) {
            setSonstiges("");
        } else if (newValue.length <= 1000) {
            setSonstiges(newValue);
        }
    };

    const [supportTicketID, setSupportTicketID] = useState<string>("");

    const onSupportTicketIDChange = (_ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        if (!newValue) {
            setSupportTicketID("");
        } else if (newValue.length <= 1000) {
            setSupportTicketID(newValue);
        }
    };

    const makeApiRequest = async () => {
        const token = client ? await getToken(client) : undefined;

        const currentDatetime: Date = new Date();
        const newline = {
            Frage: answer.choices[0].context.thoughts[0].description,
            Prompt: answer.choices[0].context.thoughts[2].description[0],
            AntwortChatGPT: answer.choices[0].message.content,
            Kontext: answer.choices[0].context.thoughts[1].description,
            Korrektheit: selectedCorrectness?.text,
            korrekte_Antwort: correct_answer,
            Quelle: handbuch,
            Anmerkung: anmerkung,
            TicketID: supportTicketID,
            Benefit: selectedBenefit?.text,
            Sonstiges: sonstiges,
            Gerät: selectedGeraet?.text,
            Benutzer: user,
            Zeitstempel: currentDatetime
        };
        const dataToAppend = JSON.stringify(newline) + "\n";

        try {
            const result = await appendToBlobApi(dataToAppend, token);
            console.log(result);
        } catch (e) {
            console.log(e);
        } finally {
            setShowInfo(true);
            setUser("");
            setAnmerkung("");
            setSonstiges("");
            setHandbuch("");
            setSupportTicketID("");
            setCorrectAnswer("");
            setSelectedBenefit(undefined);
            setSelectedCorrectness(undefined);
            setSelectedGeraet(undefined);
            const closeTimeoutId = setTimeout(() => {
                setShowInfo(false);
            }, 6000);
        }
    };

    const [selectedCorrectness, setSelectedCorrectness] = useState<IDropdownOption>();

    const [selectedBenefit, setSelectedBenefit] = useState<IDropdownOption>();

    const [selectedGeraet, setSelectedGeraet] = useState<IDropdownOption>();

    return (
        <div>
            {showInfo && (
                <div
                    style={{
                        position: "fixed",
                        top: "10px",
                        right: "10px",
                        background: "#9CBF2B",
                        padding: "10px",
                        borderRadius: "5px",
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)"
                    }}
                >
                    <p>Gespeichert!</p>
                </div>
            )}
            {
                <Stack className={styles.evaluationContainer}>
                    <Stack horizontal className={styles.evaluationInputContainer}>
                        <Dropdown
                            label="Ist die Antwort korrekt?"
                            selectedKey={selectedCorrectness ? selectedCorrectness.key : undefined}
                            onChange={(e, opt, index) => {
                                setSelectedCorrectness(opt);
                            }}
                            placeholder="Wähle eine Option"
                            options={dropdownCorrectnessOptions}
                            styles={dropdownStyles}
                        />
                    </Stack>
                    {(selectedCorrectness?.text === "Nein" || selectedCorrectness?.text === "Teils") && (
                        <div>
                            <Stack horizontal className={styles.evaluationInputTextContainer}>
                                <TextField
                                    className={styles.evaluationInputTextContainer}
                                    resizable={false}
                                    placeholder={"Bitte gib die richtige Antwort an: "}
                                    value={correct_answer}
                                    onChange={onCorrectAnswerChange}
                                />
                            </Stack>
                            <Stack horizontal className={styles.evaluationInputTextContainer}>
                                <TextField
                                    className={styles.evaluationInputTextContainer}
                                    resizable={false}
                                    placeholder={"In welchem Handbuch steht die Antwort? "}
                                    value={handbuch}
                                    onChange={onHandbuchChange}
                                />
                            </Stack>
                            <Stack horizontal className={styles.evaluationInputTextContainer}>
                                <TextField
                                    className={styles.evaluationInputTextContainer}
                                    resizable={false}
                                    placeholder={"Anmerkung: "}
                                    value={anmerkung}
                                    onChange={onAnmerkungChange}
                                />
                            </Stack>
                        </div>
                    )}
                    <Stack horizontal className={styles.evaluationInputContainer}>
                        <Dropdown
                            label="Auf welches Geraet bezieht sich die Frage?"
                            selectedKey={selectedGeraet ? selectedGeraet.key : undefined}
                            onChange={(e, opt, index) => {
                                setSelectedGeraet(opt);
                            }}
                            placeholder="Wähle eine Option"
                            options={dropdownGeraetOptions}
                            styles={dropdownStyles}
                        />
                    </Stack>
                    <Stack horizontal className={styles.evaluationInputTextContainer}>
                        <TextField
                            className={styles.evaluationInputTextContainer}
                            resizable={false}
                            placeholder={"Support Ticket ID: "}
                            value={supportTicketID}
                            onChange={onSupportTicketIDChange}
                        />
                    </Stack>
                    <Stack horizontal className={styles.evaluationInputContainer}>
                        <Dropdown
                            label="Was hat dir die Antwort gebracht?"
                            selectedKey={selectedBenefit ? selectedBenefit.key : undefined}
                            onChange={(e, opt, index) => {
                                setSelectedBenefit(opt);
                            }}
                            placeholder="Wähle eine Option"
                            options={dropdownBenefitsOptions}
                            styles={dropdownStyles}
                        />
                    </Stack>
                    <Stack horizontal className={styles.evaluationInputTextContainer}>
                        <TextField
                            className={styles.evaluationInputTextContainer}
                            resizable={false}
                            placeholder={"Sonstiges: "}
                            value={sonstiges}
                            onChange={onSonstigesChange}
                        />
                    </Stack>
                    <Stack horizontal className={styles.evaluationInputTextContainer}>
                        <TextField
                            className={styles.evaluationInputTextContainer}
                            resizable={false}
                            placeholder={"Bitte gib deinen Namen an: "}
                            value={user}
                            onChange={onUserChange}
                        />
                    </Stack>
                    <Stack horizontal className={styles.evaluationInputButtonsContainer}>
                        <IconButton
                            style={{ color: "black", marginLeft: "10px" }}
                            iconProps={{ iconName: "Save" }}
                            title="Speichern"
                            ariaLabel="Speichern"
                            onClick={() => makeApiRequest()}
                        />
                    </Stack>
                </Stack>
            }
        </div>
    );
};
