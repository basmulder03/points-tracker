import styles from "../../styles/SharedSettingStyles.module.less";
import SettingHeader from "../settingHeader/SettingHeader.tsx";
import {MdOutlineArrowForwardIos} from "react-icons/md";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import {useContext, useState} from "react";
import {EventContext} from "../../contexts/EventContext.tsx";
import {createNewEvent} from "../../firebase/services/eventService.ts";

const EventSelector = () => {
    const navigate = useNavigate();
    const params = useParams();

    const events = useContext(EventContext);
    const [addItem, setAddItem] = useState(false);
    const [newItemName, setNewItemName] = useState("");

    const goToRoute = async (route: string) => {
        navigate(route);
        setAddItem(false);
    }

    const addEvent = async () => {
        await createNewEvent(newItemName);
        setAddItem(false);
        setNewItemName("");
    }

    return (
        <>
            <div className={styles.category}>
                <SettingHeader title="Event" canAddItem={!addItem} addItemCallback={() => {
                    setAddItem(true)
                    navigate("./");
                }}/>
                <div className={styles.itemContent}>
                    {
                        events.map((event) => (
                            <div className={`${styles.listItem} ${params.docId === event.documentId && styles.active}`}
                                 onClick={() => goToRoute(event.documentId)} key={event.documentId}>
                                <span>{event.name}</span>
                                <span>
                                    <MdOutlineArrowForwardIos/>
                                </span>
                            </div>
                        ))
                    }
                    {
                        addItem && <div className={`${styles.listItem} ${styles.active}`}>
                            <input type="text" placeholder="Event name"
                                   onChange={(event) => setNewItemName(() => event.target.value)}/>
                            <button onClick={addEvent}>Save</button>
                        </div>
                    }
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default EventSelector;