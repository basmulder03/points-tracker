import styles from "./Dashboard.module.less"
import Card from "../../components/card/Card.tsx";
import {EventContext} from "../../contexts/EventContext.tsx";
import {useContext, useState} from "react";
import {DashboardContext, getSortedData} from "../../contexts/DashboardContext.tsx";
import {MdOutlineArrowDropDown, MdOutlineArrowDropUp, MdOutlineLeaderboard} from "react-icons/md";
import {FaCrown} from "react-icons/fa";

const Dashboard = () => {
    const {activeEvent, hasActiveEvent} = useContext(EventContext);
    const data = useContext(DashboardContext);

    const [openedTeam, setOpenedTeam] = useState<string>("");

    const switchOpenedTeam = (teamKey: string) => setOpenedTeam(() => openedTeam === teamKey ? "" : teamKey);

    const sortedData = getSortedData(data);

    const CURRENT_YEAR = new Date().getFullYear();
    return (
        <div className={styles.app}>
            <Card title={activeEvent?.name ?? "Points Tracker"}/>
            <div className={styles.pointOverview}>
                {
                    hasActiveEvent && sortedData.length > 0 ? sortedData.map((obj) => (
                        <div
                            className={`${styles.teamDiv} ${obj.rank <= 3 ? styles[`rank${obj.rank}`] : ""}`}
                            key={obj.teamName}
                            onClick={() => switchOpenedTeam(obj.teamName)}>
                            <div className={styles.teamContainer}>
                                <div className={styles.rank}>
                                    {obj.rank === 1 && <FaCrown className={styles.crownIcon}/>}
                                    <span>#{obj.rank}</span>
                                </div>
                                <div className={styles.teamName}>{obj.teamName}</div>
                                <div className={styles.points}>{obj.totalPoints}<small>pt</small></div>
                                {openedTeam === obj.teamName ?
                                    <MdOutlineArrowDropUp className={styles.teamIcon}/> :
                                    <MdOutlineArrowDropDown className={styles.teamIcon}/>}
                            </div>
                            {openedTeam === obj.teamName && <div className={styles.subContainer}>
                                {Object.keys(obj.games).map(gameKey => (
                                    <div key={gameKey} className={styles.container}>
                                        <span>{obj.games[gameKey].gameName}</span>
                                        <i>{obj.games[gameKey].points} punten</i>
                                    </div>
                                ))}
                            </div>}
                        </div>
                    )) : (
                        <div className={styles.emptyState}>
                            <MdOutlineLeaderboard className={styles.emptyIcon}/>
                            <p>Nog geen scores om te tonen.</p>
                        </div>
                    )
                }
            </div>
            <div className={styles.copyright}>&copy; 2024-{CURRENT_YEAR} Bas Mulder</div>
        </div>
    )
}

export default Dashboard;
