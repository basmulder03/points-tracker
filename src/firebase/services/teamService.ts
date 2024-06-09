import {addDoc, collection, deleteDoc, doc, getDocs, query, where, writeBatch} from "firebase/firestore";
import {db} from "../initializeFirebase.ts";
import {collections} from "../collections.ts";

export const createNewTeam = async (teamName: string, eventDocumentId: string) => {
    await addDoc(collection(db, collections.teams), {
        name: teamName,
        eventDocumentId: eventDocumentId,
    });
}

export const removeTeam = async (documentId: string) => {
    await deleteDoc(doc(db, collections.teams, documentId));
}

export const removeTeamsForEvent = async (eventId: string) => {
    const q = query(collection(db, collections.teams), where("eventDocumentId", "==", eventId));
    const snapshot = await getDocs(q);
    const batch = writeBatch(db);
    snapshot.forEach((doc) => {
        batch.delete(doc.ref)
    });
    await batch.commit();
}