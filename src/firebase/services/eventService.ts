import {addDoc, collection, deleteDoc, doc, writeBatch} from "firebase/firestore"
import {db} from "../initializeFirebase.ts";
import {collections} from "../collections.ts";
import {removeTeamsForEvent} from "./teamService.ts";
import {removeGamesForEvent} from "./gameService.ts";

export const createNewEvent = async (eventName: string) => {
    const docRef = await addDoc(collection(db, collections.events), {
        name: eventName,
        isActive: false
    });

    console.log("Document written with ID: ", docRef.id);
}

export const removeEvent = async (documentId: string) => {
    await removeTeamsForEvent(documentId);
    await removeGamesForEvent(documentId);
    await deleteDoc(doc(db, collections.events, documentId));
}

export const setActiveEvent = async (activeDocumentId: string, allDocumentIds: string[]) => {
    const batch = writeBatch(db);

    for (const docId of allDocumentIds) {
        if (docId === activeDocumentId) continue;

        const docRef = doc(db, collections.events, docId);
        batch.update(docRef, {isActive: false});
    }

    const activeDocRef = doc(db, collections.events, activeDocumentId);
    batch.update(activeDocRef, {isActive: true});

    await batch.commit();
}