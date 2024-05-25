import styles from "../../styles/SharedSettingStyles.module.less";
import SettingHeader from "../settingHeader/SettingHeader.tsx";
import {useContext, useState} from "react";
import {createNewTeam} from "../../firebase/services/teamService.ts";
import {EventContext} from "../../contexts/EventContext.tsx";

const TeamSetting = () => {
    const [addItem, setAddItem] = useState(false);
    const [newTeamName, setNewTeamName] = useState("");

    const {activeEvent, hasActiveEvent} = useContext(EventContext);

    const addNewTeamCallback = async () => {
        if (activeEvent) {
            await createNewTeam(newTeamName, activeEvent.documentId);
        }
        setAddItem(false);
    }

    return (
        <div className={styles.category}>
            <SettingHeader title="Team" canAddItem={!addItem && hasActiveEvent}
                           addItemCallback={() => setAddItem(true)}/>
            <div className={styles.itemContent}>
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