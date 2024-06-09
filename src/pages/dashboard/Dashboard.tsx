import styles from "./Dashboard.module.less"
import Card from "../../components/card/Card.tsx";
import {EventContext} from "../../contexts/EventContext.tsx";
import {useContext} from "react";
import {DashboardContext} from "../../contexts/DashboardContext.tsx";

const Dashboard = () => {
    const {activeEvent} = useContext(EventContext);
    const data = useContext(DashboardContext);
    console.log(data);

    return (
        <div className={styles.app}>
            <Card title={activeEvent?.name ?? ""}/>
        </div>
    )
}

export default Dashboard;