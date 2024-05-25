import {addDoc, collection} from "firebase/firestore";
import {db} from "../initializeFirebase.ts";
import {collections} from "../collections.ts";

export const createNewTeam = async (teamName: string, eventDocumentId: string) => {
    const docRef = await addDoc(collection(db, collections.teams), {
        name: teamName,
        eventDocumentId: eventDocumentId,
    });

    console.log("Document written with ID: ", docRef.id);
}