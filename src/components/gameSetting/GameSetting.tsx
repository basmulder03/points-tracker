import styles from "../../styles/SharedSettingStyles.module.less";
import SettingHeader from "../settingHeader/SettingHeader.tsx";
import {useContext, useState} from "react";
import {EventContext} from "../../contexts/EventContext.tsx";
import {GameContext} from "../../contexts/GameContext.tsx";
import {useParams} from "react-router-dom";
import {createNewGame, removeGame} from "../../firebase/services/gameService.ts";
import {FaTrashAlt} from "react-icons/fa";

const GameSetting = () => {
    const [addItem, setAddItem] = useState<boolean>(false);
    const [newGameName, setNewGameName] = useState<string>("");

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

    return (
        <div className={styles.category}>
            <SettingHeader title="Game"
                           canAddItem={!addItem && hasActiveEvent}
                           addItemCallback={() => setAddItem(true)}
            />
            <div className={styles.itemContent}>
                {
                    allGames.filter(g => g.eventDocumentId === params.docId).map((game) => (
                        <div className={`${styles.listItem}`}>
                            <div className={styles.name}>
                                <FaTrashAlt className={styles.deleteIcon} onClick={() => deleteGame(game.documentId)}/>
                                {game.name}
                            </div>
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