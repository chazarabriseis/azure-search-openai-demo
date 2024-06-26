import { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { Stack, TextField, IconButton } from "@fluentui/react";
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownStyles } from "@fluentui/react/lib/Dropdown";

import { AnimalTurtle16Filled, Send28Filled } from "@fluentui/react-icons";
import { useLogin, getToken, isLoggedIn, requireAccessControl } from "../../authConfig";
import { ChatAppResponse, appendToBlobApi } from "../../api";

import styles from "./EvaluationInput.module.css";
import { to } from "@react-spring/web";

interface Props {
    disabled: boolean;
    tabName: string;
    // answer: ChatAppResponse;
    // question: string;
}

const client = useLogin ? useMsal().instance : undefined;

const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } };

const dropdownCorrectnessOptions = [
    { key: "ja", text: "Ja" },
    { key: "teils", text: "Teils" },
    { key: "nein", text: "Nein" },
    { key: "nicht beurteilbar", text: "Nicht beurteilbar" }
];

const dropdownBenefitsOptions = [
    { key: "Suchaufwand in interner Doku erspart.", text: "Suchaufwand in interner Doku erspart." },
    { key: "Rücksprache mit Kollegen erspart.", text: "Rücksprache mit Kollegen erspart." },
    { key: "Rücksprache mit Experten erspart.", text: "Rücksprache mit Experten erspart." },
    { key: "Sonstiges, siehe unten:", text: "Sonstiges, siehe unten:" }
];

const dropdownThemenOptions = [
    { key: "5200", text: "5200" },
    { key: "5205", text: "5205" },
    { key: "5320", text: "5320" },
    { key: "5500", text: "5500" },
    { key: "5540", text: "5540" },
    { key: "5600", text: "5600" },
    { key: "ACM40e", text: "ACM40e" },
    { key: "ACM80eRack", text: "ACM80eRack" },
    { key: "ACM80eWand", text: "ACM80eWand" },
    { key: "intus com", text: "INTUS COM" },
    { key: "RFID-Zutrittsleser", text: "RFID-Zutrittsleser" },
    { key: "RFID-Technologie", text: "RFID-Technologie" },
    { key: "Flex Air", text: "Flex Air" },
    { key: "Flex OnCard ", text: "Flex OnCard" },
    { key: "PegaSys", text: "PegaSys" },
    { key: "DEXICON", text: "DEXICON" },
    { key: "DEXIOS", text: "DEXIOS" },
    { key: "INTUS COM/TPI", text: "INTUS COM/TPI" },
    { key: "TCL", text: "TCL" },
    { key: "Palm Secure", text: "Palm Secure" },
    { key: "Fingerprint", text: "Fingerprint" },
    { key: "Kaufmännisches", text: "Kaufmännisches" },
    { key: "Rechtliches", text: "Rechtliches" },
    { key: "Geräte-Firmware", text: "Geräte-Firmware" },
    { key: "Leser-Firmware", text: "Leser-Firmware" },
    { key: "Sonstiges", text: "Sonstiges" }
];

export const EvaluationInputChat = ({ disabled, tabName }: Props) => {
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

    const [sonstiges, setSonstiges] = useState<string>("");

    const onSonstigesChange = (_ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        if (!newValue) {
            setSonstiges("");
        } else if (newValue.length <= 1000) {
            setSonstiges(newValue);
        }
    };

    const [benefitMinuten, setBenefitMinuten] = useState<string>("");

    const onBenefitMinutenChange = (_ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        if (!newValue) {
            setBenefitMinuten("");
        } else if (newValue.length <= 5000) {
            setBenefitMinuten(newValue);
        }
    };

    const [selectedBenefits, setSelectedBenefits] = useState<IDropdownOption[]>([]);

    const onChangeSelectedBenefit = (
        event: React.FormEvent<HTMLDivElement> | undefined,
        item: IDropdownOption<any> | undefined,
        index: number | undefined
    ): void => {
        if (!item) {
            // Handle the case when item is undefined
            console.log("Keine Auswahl!");
            return;
        }
        const updatedSelection = [...selectedBenefits];

        if (item.selected) {
            // Add the selected item to the array
            updatedSelection.push(item);
        } else {
            // Remove the unselected item from the array
            const indexToRemove = updatedSelection.findIndex(option => option.key === item.key);
            if (indexToRemove !== -1) {
                updatedSelection.splice(indexToRemove, 1);
            }
        }

        setSelectedBenefits(updatedSelection);
    };

    const [selectedThemen, setSelectedThemen] = useState<IDropdownOption[]>([]);

    const onChangeSelectedThemen = (
        event: React.FormEvent<HTMLDivElement> | undefined,
        item: IDropdownOption<any> | undefined,
        index: number | undefined
    ): void => {
        if (!item) {
            // Handle the case when item is undefined
            console.log("Keine Auswahl!");
            return;
        }
        const updatedSelection = [...selectedThemen];

        if (item.selected) {
            // Add the selected item to the array
            updatedSelection.push(item);
        } else {
            // Remove the unselected item from the array
            const indexToRemove = updatedSelection.findIndex(option => option.key === item.key);
            if (indexToRemove !== -1) {
                updatedSelection.splice(indexToRemove, 1);
            }
        }

        setSelectedThemen(updatedSelection);
    };

    const makeApiRequest = async () => {
        const token = client ? await getToken(client) : undefined;
        /*
        const contextList = answer.choices[0].context.thoughts[1].description;
        const context: string[] = [];
        if (contextList.length > 0) {
            for (const dict of contextList) {
                if ("sourcepage" in dict) {
                    context.push(dict["sourcepage"]);
                }
            }
        }
        */
        const currentDatetime: Date = new Date();
        const benefitsListe = selectedBenefits.map(item => item.text);
        const themenListe = selectedThemen.map(item => item.text);

        const newline = {
            TabName: tabName,
            //Frage: answer.choices[0].context.thoughts[0].description,
            //AntwortChatGPT: answer.choices[0].message.content,
            //Kontext: context,
            Korrektheit: selectedCorrectness?.text,
            korrekte_Antwort: correct_answer,
            Benefit: benefitsListe,
            BenefitMinuten: benefitMinuten,
            Thema: themenListe,
            Sonstiges: sonstiges,
            Benutzer: user,
            Zeitstempel: currentDatetime,
            model: "gpt-4"
        };
        const dataToAppend = JSON.stringify(newline) + "\n";

        try {
            const result = await appendToBlobApi(dataToAppend, token);
        } catch (e) {
            console.log(e);
        } finally {
            setShowInfo(true);
            setUser("");
            setSonstiges("");
            setCorrectAnswer("");
            setSelectedBenefits([]);
            setSelectedCorrectness(undefined);
            const closeTimeoutId = setTimeout(() => {
                setShowInfo(false);
            }, 6000);
        }
    };

    const [selectedCorrectness, setSelectedCorrectness] = useState<IDropdownOption>();

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
                            label="Ist die Antwort inhaltlich korrekt?"
                            selectedKey={selectedCorrectness ? selectedCorrectness.key : undefined}
                            onChange={(e, opt, index) => {
                                setSelectedCorrectness(opt);
                            }}
                            placeholder="Wähle eine Option"
                            options={dropdownCorrectnessOptions}
                            styles={dropdownStyles}
                        />
                    </Stack>
                    {(selectedCorrectness?.text === "Nein" || selectedCorrectness?.text === "Teils" || selectedCorrectness?.text === "Nicht beurteilbar") && (
                        <div>
                            <Stack horizontal className={styles.evaluationInputTextContainer}>
                                <TextField
                                    className={styles.evaluationInputTextContainer}
                                    resizable={false}
                                    placeholder={"Was hat nicht gepasst?"}
                                    value={correct_answer}
                                    onChange={onCorrectAnswerChange}
                                />
                            </Stack>
                        </div>
                    )}
                    <Stack horizontal className={styles.evaluationInputContainer}>
                        <Dropdown
                            label="Auf welches Thema bezog sich der Chat?"
                            selectedKeys={selectedThemen?.map(option => option.key.toString())}
                            onChange={onChangeSelectedThemen}
                            placeholder="Wähle eine Option"
                            options={dropdownThemenOptions}
                            styles={dropdownStyles}
                            multiSelect
                        />
                    </Stack>
                    <Stack horizontal className={styles.evaluationInputContainer}>
                        <Dropdown
                            label="Was hat dir die Antwort gebracht?"
                            selectedKeys={selectedBenefits?.map(option => option.key.toString())}
                            onChange={onChangeSelectedBenefit}
                            placeholder="Wähle eine Option"
                            options={dropdownBenefitsOptions}
                            styles={dropdownStyles}
                            multiSelect
                        />
                    </Stack>
                    <Stack horizontal className={styles.evaluationInputTextContainer}>
                        <TextField
                            className={styles.evaluationInputTextContainer}
                            resizable={false}
                            placeholder={"Wieviel Zeitersparnis (in Minuten) hat dir Athena gebracht?"}
                            value={benefitMinuten}
                            onChange={onBenefitMinutenChange}
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
