import {collection, onSnapshot, query} from "firebase/firestore";
import {createContext, useEffect, useState} from "react";
import {db} from "../firebase/initializeFirebase.ts";
import {collections} from "../firebase/collections.ts";
import {RunningEvent} from "../entities/RunningEvent.ts";
import {stringCompareFunction} from "../helpers/sortStrings.ts";

const EventContext = createContext<RunningEvent[]>([]);

const EventContextProvider = (props: React.PropsWithChildren) => {
    const [events, setEvents] = useState<RunningEvent[]>([]);

    useEffect(() => {
        const q = query(collection(db, collections.events))
        const unsub = onSnapshot(q, (snapshot) => {
            const newEventList: {[docId: string]: RunningEvent} = {};
            events.forEach(event => newEventList[event.documentId] = event);
            console.log("got new changes", newEventList);
            snapshot.docChanges().forEach((change) => {
                console.log(change)
                if (change.type === "added" || change.type === "modified") {
                    newEventList[change.doc.id] = {
                        name: change.doc.data().name,
                        isActive: change.doc.data().isActive,
                        documentId: change.doc.id
                    }
                } else if (change.type === "removed") {
                    delete newEventList[change.doc.id];
                }
            });

            var newEvents = Object.values(newEventList);
            newEvents.sort((a, b) => stringCompareFunction(a.name, b.name));

            setEvents(newEvents);
            console.log('Added events', newEvents)
        })

        return () => {
            unsub();
        }
    }, []);

    return (
        <EventContext.Provider value={events}>
            {props.children}
        </EventContext.Provider>
    )
}

export default EventContextProvider;
export {EventContext};