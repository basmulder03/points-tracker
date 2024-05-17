import {addDoc, collection} from "firebase/firestore"
import {db} from "../initializeFirebase.ts";

const AddNewTeam = async (teamName: string) => {
    try {
        const docRef = await addDoc(collection(db, "teams"), {
            name: teamName,
        });

        return docRef.id;
    }
    catch (error) {
        console.error(error);
    }
}

export {AddNewTeam};