import {addDoc, collection} from "firebase/firestore"
import {db} from "../initializeFirebase.ts";
import {collections} from "../collections.ts";

export const createNewEvent = async (eventName: string) => {
    const docRef = await addDoc(collection(db, collections.events), {
        name: eventName,
        isActive: false
    });

    console.log("Document written with ID: ", docRef.id);
}