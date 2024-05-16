import styles from "./Dashboard.module.less"
import Card from "../../components/card/Card.tsx";

const Dashboard = () => {
    return (
        <div className={styles.app}>
            <Card title="Dashboard" />
        </div>
    )
}

export default Dashboard;