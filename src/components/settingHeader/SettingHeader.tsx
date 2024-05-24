import styles from "./SettingHeader.module.less";
import {IoAddCircleOutline} from "react-icons/io5";

interface ISettingHeader {
    title: string;
    canAddItem?: boolean;
    addItemCallback?: () => void;
}

const SettingHeader = (props: ISettingHeader) => {
    return (
        <div className={styles.container}>
            <div className={styles.itemHeader}>{props.title}</div>
            {props?.canAddItem &&
                <span className={styles.addIcon} onClick={props.addItemCallback}><IoAddCircleOutline size={32}
                                                                                                     className={styles.icon}/></span>}
        </div>
    )
}

export default SettingHeader;
