import {createContext, useContext, useEffect, useState} from "react";
import {EventContext} from "./EventContext.tsx";
import {collection, onSnapshot, query, Unsubscribe, where} from "firebase/firestore";
import {db} from "../firebase/initializeFirebase.ts";
import {collections} from "../firebase/collections.ts";
import {Point} from "../entities/Point.ts";

const PointContext = createContext<Point[]>([]);

const PointContextProvider = (props: React.PropsWithChildren) => {
    const [points, setPoints] = useState<Point[]>([]);

    const {activeEvent, hasActiveEvent} = useContext(EventContext);


    useEffect(() => {
        let unsub: Unsubscribe;
        if (hasActiveEvent && activeEvent !== null) {
            const q = query(collection(db, collections.points), where("eventDocumentId", "==", activeEvent.documentId));
            unsub = onSnapshot(q, (snapshot) => {
               const points: Point[] = [];
               snapshot.forEach(doc => {
                   points.push({
                       amount: doc.data().amount,
                       eventDocumentId: doc.data().eventDocumentId,
                       gameDocumentId: doc.data().gameDocumentId,
                       teamDocumentId: doc.data().teamDocumentId,
                       documentId: doc.id
                   });
               });
               setPoints(() => points);
            });
        }

        return () => {
            if (unsub !== null && unsub !== undefined) unsub();
        }
    }, [activeEvent]);

    return (
        <PointContext.Provider value={points}>
            {props.children}
        </PointContext.Provider>
    )
}

export default PointContextProvider;
export {PointContext};