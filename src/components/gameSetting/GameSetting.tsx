import styles from "../../styles/SharedSettingStyles.module.less";
import SettingHeader from "../settingHeader/SettingHeader.tsx";
import {useContext, useState} from "react";
import {EventContext} from "../../contexts/EventContext.tsx";
import {GameContext} from "../../contexts/GameContext.tsx";
import {useParams} from "react-router-dom";
import {createNewGame, removeGame, renameGame} from "../../firebase/services/gameService.ts";
import {FaCheck, FaPen, FaTimes, FaTrashAlt} from "react-icons/fa";

const GameSetting = () => {
    const [addItem, setAddItem] = useState<boolean>(false);
    const [newGameName, setNewGameName] = useState<string>("");

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState("");

    const {activeEvent, hasActiveEvent} = useContext(EventContext);
    const {allGames} = useContext(GameContext);

    const params = useParams();

    const addNewGameCallback = async () => {
        if (activeEvent) {
            await createNewGame(newGameName, params.docId!!);
        }
        setAddItem(false);
    }

    const deleteGame = async (docId: string) => {
        await removeGame(docId)
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
            await renameGame(docId, editValue.trim());
        }
        cancelEdit();
    }

    return (
        <div className={styles.category}>
            <SettingHeader title="Game"
                           canAddItem={!addItem && hasActiveEvent}
                           addItemCallback={() => setAddItem(true)}
            />
            <div className={styles.itemContent}>
                {
                    allGames.filter(g => g.eventDocumentId === params.docId).map((game) => (
                        <div className={`${styles.listItem}`} key={game.documentId}>
                            <div className={styles.name}>
                                <FaTrashAlt className={styles.deleteIcon} onClick={() => deleteGame(game.documentId)}/>
                                {
                                    editingId === game.documentId ? (
                                        <input type="text" className={styles.editInput} autoFocus
                                               value={editValue}
                                               onChange={(e) => setEditValue(e.target.value)}
                                               onKeyDown={(e) => {
                                                   if (e.key === "Enter") saveEdit(game.documentId);
                                                   if (e.key === "Escape") cancelEdit();
                                               }}/>
                                    ) : (
                                        <span className={styles.nameText}>{game.name}</span>
                                    )
                                }
                            </div>
                            {
                                editingId === game.documentId ? (
                                    <div className={styles.editActions}>
                                        <FaCheck className={styles.saveIcon} onClick={() => saveEdit(game.documentId)}/>
                                        <FaTimes className={styles.cancelIcon} onClick={cancelEdit}/>
                                    </div>
                                ) : (
                                    <FaPen className={styles.editIcon}
                                           onClick={() => startEdit(game.documentId, game.name)}/>
                                )
                            }
                        </div>
                    ))
                }
                {
                    addItem && <div className={`${styles.listItem} ${styles.active}`}>
                        <input type="text" placeholder="Event name"
                               onChange={(event) => setNewGameName(() => event.target.value)}/>
                        <button onClick={addNewGameCallback}>Save</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default GameSetting;
