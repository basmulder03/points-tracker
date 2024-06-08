import {collection, onSnapshot, query} from "firebase/firestore";
import {createContext, useContext, useEffect, useState} from "react";
import {db} from "../firebase/initializeFirebase.ts";
import {collections} from "../firebase/collections.ts";
import {Team} from "../entities/Team.ts";
import {EventContext} from "./EventContext.tsx";

const TeamContext = createContext<{
    allTeams: Team[],
    teamsInThisEvent: Team[]
}>({
    allTeams: [],
    teamsInThisEvent: []
});

const TeamContextProvider = (props: React.PropsWithChildren) => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [teamsInThisEvent, setTeamsInThisEvent] = useState<Team[]>([]);

    const {activeEvent, hasActiveEvent} = useContext(EventContext);

    useEffect(() => {
        const q = query(collection(db, collections.teams))
        const unsub = onSnapshot(q, (snapshot) => {
            const allTeams: Team[] = [];
            snapshot.forEach(doc => {
                allTeams.push({
                    name: doc.data().name,
                    eventDocumentId: doc.data().eventDocumentId,
                    documentId: doc.id
                })
            });
            setTeams(() => allTeams)
        })

        return () => {
            unsub();
        }
    }, []);

    useEffect(() => {
        if (hasActiveEvent && activeEvent !== null) {
            setTeamsInThisEvent(() => teams.filter(t => t.eventDocumentId === activeEvent.documentId));
        }
    }, [activeEvent, teams]);

    return (
        <TeamContext.Provider value={{
            allTeams: teams,
            teamsInThisEvent: teamsInThisEvent
        }}>
            {props.children}
        </TeamContext.Provider>
    )
}

export default TeamContextProvider;
export {TeamContext};