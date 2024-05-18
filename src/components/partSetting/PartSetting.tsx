import styles from "../../styles/SharedSettingStyles.module.less";
import SettingHeader from "../settingHeader/SettingHeader.tsx";

const PartSetting = () => {
    return (
        <div className={styles.category}>
            <SettingHeader title="Part" />
        </div>
    )
}

export default PartSetting;