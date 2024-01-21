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
    { key: "Zeitersparnis", text: "Zeitersparnis" },
    { key: "Inspiration / Input", text: "Inspiration / Input" },
    { key: "Sonstiges, siehe unten:", text: "Sonstiges, siehe unten:" }
];

export const EvaluationInputChatGPT = ({ disabled, tabName }: Props) => {
    const [showInfo, setShowInfo] = useState(false);

    const { instance } = useMsal();
    const disableRequiredAccessControl = requireAccessControl && !isLoggedIn(instance);

    const [user, setUser] = useState<string>("");
    const [selectedBenefits, setSelectedBenefits] = useState<IDropdownOption[]>([]);

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
        const newline = {
            TabName: tabName,
            //Frage: answer.choices[0].context.thoughts[0].description,
            //AntwortChatGPT: answer.choices[0].message.content,
            //Kontext: context,
            Korrektheit: selectedCorrectness?.text,
            korrekte_Antwort: correct_answer,
            Benefit: benefitsListe,
            Sonstiges: sonstiges,
            Benutzer: user,
            Zeitstempel: currentDatetime
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
                            label="Was hat dir die Antwort gebracht?"
                            selectedKey={selectedBenefits?.map(option => option.key.toString())}
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
