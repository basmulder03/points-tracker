import styles from "./Dashboard.module.less"
import Card from "../../components/card/Card.tsx";
import {EventContext} from "../../contexts/EventContext.tsx";
import {useContext, useState} from "react";
import {DashboardContext, getSortedData} from "../../contexts/DashboardContext.tsx";
import {MdOutlineArrowDropDown, MdOutlineArrowDropUp} from "react-icons/md";

const Dashboard = () => {
    const {activeEvent} = useContext(EventContext);
    const data = useContext(DashboardContext);

    const [openedTeam, setOpenedTeam] = useState<string>("");

    const switchOpenedTeam = (teamKey: string) => setOpenedTeam(() => openedTeam === teamKey ? "" : teamKey);

    return (
        <div className={styles.app}>
            <Card title={activeEvent?.name ?? ""}/>
            <div className={styles.pointOverview}>
                {
                    getSortedData(data).map((obj) => (
                        <div className={styles.teamDiv} key={obj.teamName}
                             onClick={() => switchOpenedTeam(obj.teamName)}>
                            <div className={styles.teamContainer}>
                                <div className={styles.teamName}>
                                    <b>#{obj.rank}</b>
                                    {obj.teamName}
                                    <i>({obj.totalPoints} punten)</i></div>
                                {openedTeam === obj.teamName ? <MdOutlineArrowDropUp className={styles.teamIcon}/> :
                                    <MdOutlineArrowDropDown className={styles.teamIcon}/>}
                            </div>
                            {openedTeam === obj.teamName && <div className={styles.subContainer}>
                                {Object.keys(obj.games).map(gameKey => (
                                    <div key={gameKey} className={styles.container}>
                                        {obj.games[gameKey].gameName}
                                        <i>({obj.games[gameKey].points} punten)</i>
                                    </div>
                                ))}
                            </div>}
                        </div>
                    ))
                }
            </div>
            <div className={styles.copyright}>&copy; 2024 Bas Mulder</div>
        </div>
    )
}

export default Dashboard;