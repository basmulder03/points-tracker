import styles from "./TeamManagement.module.less"
import {AddNewTeam} from "../../firebase/services/TeamService.ts";

const TeamManagement = () => {
    return (
        <div className={styles.container}>
            <button onClick={() => AddNewTeam("TestTeam123")}>New Team</button>
        </div>
    )
}

export default TeamManagement;