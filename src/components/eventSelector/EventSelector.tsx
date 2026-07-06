import styles from "../../styles/SharedSettingStyles.module.less";
import SettingHeader from "../settingHeader/SettingHeader.tsx";
import {MdOutlineArrowForwardIos} from "react-icons/md";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {EventContext} from "../../contexts/EventContext.tsx";
import {createNewEvent, removeEvent, renameEvent, setActiveEvent} from "../../firebase/services/eventService.ts";
import {FaCheck, FaPen, FaTimes, FaTrashAlt} from "react-icons/fa";

const EventSelector = () => {
    const navigate = useNavigate();
    const params = useParams();

    const events = useContext(EventContext);
    const [addItem, setAddItem] = useState(false);
    const [newItemName, setNewItemName] = useState("");

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState("");

    useEffect(() => {
        if (!params.docId && !addItem && events.activeEvent) {
            navigate(events.activeEvent.documentId, {replace: true});
        }
    }, [params.docId, addItem, events.activeEvent]);

    const goToRoute = async (route: string) => {
        navigate(route);
        setAddItem(false);
    }

    const addEvent = async () => {
        await createNewEvent(newItemName);
        setAddItem(false);
        setNewItemName("");
    }

    const deleteEvent = async (docId: string) => {
        await removeEvent(docId);
        navigate("./");
    }

    const changeActiveEvent = async (docId: string, isActive: boolean) => {
        if (!isActive) {
            await setActiveEvent(docId, events.allEvents.map(e => e.documentId));
        }
    }

    const startEdit = (docId: string, currentName: string) => {
        setEditingId(docId);
        setEditValue(currentName);
    }

    const cancelEdit = () => {
        setEditingId(null);
        setEditValue("");
    }

    const saveEdit = async (docId: string) => {
        if (editValue.trim().length > 0) {
            await renameEvent(docId, editValue.trim());
        }
        cancelEdit();
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
                        events.allEvents.map((event) => (
                            <div className={`${styles.listItem} ${params.docId === event.documentId && styles.active}`}
                                 onClick={() => editingId !== event.documentId && goToRoute(event.documentId)}
                                 key={event.documentId}>
                                <div className={styles.name}>
                                    <FaTrashAlt className={styles.deleteIcon}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteEvent(event.documentId);
                                                }}/>
                                    {
                                        editingId === event.documentId ? (
                                            <input type="text" className={styles.editInput} autoFocus
                                                   value={editValue}
                                                   onClick={(e) => e.stopPropagation()}
                                                   onChange={(e) => setEditValue(e.target.value)}
                                                   onKeyDown={(e) => {
                                                       if (e.key === "Enter") saveEdit(event.documentId);
                                                       if (e.key === "Escape") cancelEdit();
                                                   }}/>
                                        ) : (
                                            <span className={styles.nameText}>{event.name}</span>
                                        )
                                    }
                                </div>
                                {
                                    editingId === event.documentId ? (
                                        <div className={styles.editActions} onClick={(e) => e.stopPropagation()}>
                                            <FaCheck className={styles.saveIcon} onClick={() => saveEdit(event.documentId)}/>
                                            <FaTimes className={styles.cancelIcon} onClick={cancelEdit}/>
                                        </div>
                                    ) : (
                                        <FaPen className={styles.editIcon}
                                               onClick={(e) => {
                                                   e.stopPropagation();
                                                   startEdit(event.documentId, event.name);
                                               }}/>
                                    )
                                }
                                <small
                                    className={event.isActive ? styles.activePill : styles.inactivePill}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        changeActiveEvent(event.documentId, event.isActive);
                                    }}>{event.isActive ? 'Actief' : 'Maak actief'}</small>
                                <div>
                                    <MdOutlineArrowForwardIos/>
                                </div>
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
