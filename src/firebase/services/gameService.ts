import {addDoc, collection, deleteDoc, doc, getDocs, query, where, writeBatch} from "firebase/firestore";
import {db} from "../initializeFirebase.ts";
import {collections} from "../collections.ts";

export const createNewGame = async (gameName: string, eventDocumentId: string) => {
    await addDoc(collection(db, collections.games), {
        name: gameName,
        eventDocumentId: eventDocumentId,
    });
}

export const removeGame = async (documentId: string) => {
    await deleteDoc(doc(db, collections.games, documentId));
}

export const removeGamesForEvent = async (eventId: string) => {
    const q = query(collection(db, collections.games), where("eventDocumentId", "==", eventId));
    const snapshot = await getDocs(q);
    const batch = writeBatch(db);
    snapshot.forEach((doc) => {
        batch.delete(doc.ref)
    });
    await batch.commit();
}