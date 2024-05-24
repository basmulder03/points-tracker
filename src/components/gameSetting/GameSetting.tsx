import styles from "../../styles/SharedSettingStyles.module.less";
import SettingHeader from "../settingHeader/SettingHeader.tsx";

const GameSetting = () => {
    return (
        <div className={styles.category}>
            <SettingHeader title="Game"/>
        </div>
    )
}

export default GameSetting;