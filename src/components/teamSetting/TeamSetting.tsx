import styles from "../../styles/SharedSettingStyles.module.less";
import SettingHeader from "../settingHeader/SettingHeader.tsx";
import {useContext, useState} from "react";
import {createNewTeam, removeTeam} from "../../firebase/services/teamService.ts";
import {EventContext} from "../../contexts/EventContext.tsx";
import {TeamContext} from "../../contexts/TeamContext.tsx";
import {FaTrashAlt} from "react-icons/fa";
import {useParams} from "react-router-dom";

const TeamSetting = () => {
    const [addItem, setAddItem] = useState(false);
    const [newTeamName, setNewTeamName] = useState("");

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

    return (
        <div className={styles.category}>
            <SettingHeader title="Team" canAddItem={!addItem && hasActiveEvent}
                           addItemCallback={() => setAddItem(true)}/>
            <div className={styles.itemContent}>
                {
                    allTeams.filter(t => t.eventDocumentId === params.docId).map((team) => (
                        <div className={`${styles.listItem}`}>
                            <div className={styles.name}>
                                <FaTrashAlt className={styles.deleteIcon} onClick={() => deleteTeam(team.documentId)}/>
                                {team.name}
                            </div>
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