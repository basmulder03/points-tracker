import styles from "./SettingHeader.module.less";

interface ISettingHeader {
    title: string;
}

const SettingHeader = (props: ISettingHeader) => {
    return (
        <div className={styles.itemHeader}>{props.title}</div>
    )
}

export default SettingHeader;
