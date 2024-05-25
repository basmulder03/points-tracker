import {collection, onSnapshot, query} from "firebase/firestore";
import {createContext, useEffect, useState} from "react";
import {db} from "../firebase/initializeFirebase.ts";
import {collections} from "../firebase/collections.ts";
import {RunningEvent} from "../entities/RunningEvent.ts";
import {stringCompareFunction} from "../helpers/sortStrings.ts";

const EventContext = createContext<{
    allEvents: RunningEvent[],
    activeEvent: RunningEvent | null,
    hasActiveEvent: boolean
}>({
    allEvents: [],
    activeEvent: null,
    hasActiveEvent: false
});

const EventContextProvider = (props: React.PropsWithChildren) => {
    const [events, setEvents] = useState<RunningEvent[]>([]);
    const [activeEvent, setActiveEvent] = useState<RunningEvent | null>(null);
    const [hasActiveEvent, setHasActiveEvent] = useState(false);

    useEffect(() => {
        const q = query(collection(db, collections.events))
        const unsub = onSnapshot(q, (snapshot) => {
            const newEventList: {[docId: string]: RunningEvent} = {};

            snapshot.forEach(doc => {
                newEventList[doc.id] = {
                    name: doc.data().name,
                    isActive: doc.data().isActive,
                    documentId: doc.id
                }
            });

            const newEvents = Object.values(newEventList);
            newEvents.sort((a, b) => stringCompareFunction(a.name, b.name));
            setEvents(newEvents);

            const newActiveEvent = newEvents.find(event => event.isActive)
            setActiveEvent(newActiveEvent || null)
            setHasActiveEvent(newActiveEvent !== null);
            console.log('Added events', newEvents, 'and set active event', newActiveEvent)
        })

        return () => {
            unsub();
        }
    }, []);

    return (
        <EventContext.Provider value={{allEvents: events, activeEvent, hasActiveEvent}}>
            {props.children}
        </EventContext.Provider>
    )
}

export default EventContextProvider;
export {EventContext};