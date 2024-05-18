import styles from "../../styles/SharedSettingStyles.module.less";
import SettingHeader from "../settingHeader/SettingHeader.tsx";

const TeamSetting = () => {
    return (
        <div className={styles.category}>
            <SettingHeader title="Team" />
        </div>
    )
}

export default TeamSetting;