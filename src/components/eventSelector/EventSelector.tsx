import styles from "../../styles/SharedSettingStyles.module.less";
import SettingHeader from "../settingHeader/SettingHeader.tsx";
import {MdOutlineArrowForwardIos} from "react-icons/md";
import {Outlet, useNavigate, useParams} from "react-router-dom";

const EventSelector = () => {
    const navigate = useNavigate();
    const params = useParams();

    const goToRoute = async (route: string) => {
        navigate(route);
    }

    return (
        <>
            <div className={styles.category}>
                <SettingHeader title="Event"/>
                <div className={styles.itemContent}>
                    <div className={`${styles.listItem} ${params.docId === 'test' && styles.active}`} onClick={() => goToRoute("test")}>
                        <span>Test</span>
                        <span>
                            <MdOutlineArrowForwardIos/>
                        </span>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default EventSelector;