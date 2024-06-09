import {collection, doc, getDocs, query, where, writeBatch} from "firebase/firestore";
import {db} from "../initializeFirebase.ts";
import {collections} from "../collections.ts";

export const addPointsForGame = async (eventId: string, gameId: string, points: {
    points: number,
    teamId: string,
    documentId: string | null
}[]) => {
    const batch = writeBatch(db);
    points.forEach((point) => {
        const docRef = point.documentId !== null ? doc(db, collections.points, point.documentId)
            : doc(collection(db, collections.points));
        batch.set(docRef, {
            eventDocumentId: eventId,
            gameDocumentId: gameId,
            teamDocumentId: point.teamId,
            amount: point.points
        });
    })

    await batch.commit();
}

export const removePointsForEvent = async (eventId: string) => {
    const q = query(collection(db, collections.points), where("eventDocumentId", "==", eventId));
    const snapshot = await getDocs(q);
    const batch = writeBatch(db);
    snapshot.forEach((doc) => {
        batch.delete(doc.ref)
    });
    await batch.commit();
}