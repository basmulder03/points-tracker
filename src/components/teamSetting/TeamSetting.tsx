import styles from "../../styles/SharedSettingStyles.module.less";
import SettingHeader from "../settingHeader/SettingHeader.tsx";
import {useContext, useState} from "react";
import {createNewTeam, removeTeam, renameTeam} from "../../firebase/services/teamService.ts";
import {EventContext} from "../../contexts/EventContext.tsx";
import {TeamContext} from "../../contexts/TeamContext.tsx";
import {FaCheck, FaPen, FaTimes, FaTrashAlt} from "react-icons/fa";
import {useParams} from "react-router-dom";

const TeamSetting = () => {
    const [addItem, setAddItem] = useState(false);
    const [newTeamName, setNewTeamName] = useState("");

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState("");

    const {activeEvent, hasActiveEvent} = useContext(EventContext);
    const {allTeams} = useContext(TeamContext);

    const params = useParams();

    const addNewTeamCallback = async () => {
        if (activeEvent) {
            await createNewTeam(newTeamName, params.docId!!);
        }
        setAddItem(false);
    }

    const deleteTeam = async (docId: string) => {
        await removeTeam(docId);
    }

    const startEdit = (docId: string, currentName: string) => {
        setEditingId(docId);
        setEditValue(currentName);
    }

    const cancelEdit = () => {
        setEditingId(null);
        setEditValue("");
    }

    const saveEdit = async (docId: string) => {
        if (editValue.trim().length > 0) {
            await renameTeam(docId, editValue.trim());
        }
        cancelEdit();
    }

    return (
        <div className={styles.category}>
            <SettingHeader title="Team" canAddItem={!addItem && hasActiveEvent}
                           addItemCallback={() => setAddItem(true)}/>
            <div className={styles.itemContent}>
                {
                    allTeams.filter(t => t.eventDocumentId === params.docId).map((team) => (
                        <div className={`${styles.listItem}`} key={team.documentId}>
                            <div className={styles.name}>
                                <FaTrashAlt className={styles.deleteIcon} onClick={() => deleteTeam(team.documentId)}/>
                                {
                                    editingId === team.documentId ? (
                                        <input type="text" className={styles.editInput} autoFocus
                                               value={editValue}
                                               onChange={(e) => setEditValue(e.target.value)}
                                               onKeyDown={(e) => {
                                                   if (e.key === "Enter") saveEdit(team.documentId);
                                                   if (e.key === "Escape") cancelEdit();
                                               }}/>
                                    ) : (
                                        <span className={styles.nameText}>{team.name}</span>
                                    )
                                }
                            </div>
                            {
                                editingId === team.documentId ? (
                                    <div className={styles.editActions}>
                                        <FaCheck className={styles.saveIcon} onClick={() => saveEdit(team.documentId)}/>
                                        <FaTimes className={styles.cancelIcon} onClick={cancelEdit}/>
                                    </div>
                                ) : (
                                    <FaPen className={styles.editIcon}
                                           onClick={() => startEdit(team.documentId, team.name)}/>
                                )
                            }
                        </div>
                    ))
                }
                {
                    addItem && <div className={`${styles.listItem} ${styles.active}`}>
                        <input type="text" placeholder="Event name"
                               onChange={(event) => setNewTeamName(() => event.target.value)}/>
                        <button onClick={addNewTeamCallback}>Save</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default TeamSetting;
