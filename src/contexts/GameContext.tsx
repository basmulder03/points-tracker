import {createContext, useContext, useEffect, useState} from "react";
import {Game} from "../entities/Game.ts";
import {EventContext} from "./EventContext.tsx";
import {collection, onSnapshot, query} from "firebase/firestore";
import {db} from "../firebase/initializeFirebase.ts";
import {collections} from "../firebase/collections.ts";

const GameContext = createContext<{
    allGames: Game[],
    gamesInThisEvent: Game[]
}>({
    allGames: [],
    gamesInThisEvent: []
});

const GameContextProvider = (props: React.PropsWithChildren) => {
    const [games, setGames] = useState<Game[]>([]);
    const [gamesInThisEvent, setGamesInThisEvent] = useState<Game[]>([]);

    const {activeEvent, hasActiveEvent} = useContext(EventContext);

    useEffect(() => {
        const q = query(collection(db, collections.games));
        const unsub = onSnapshot(q, (snapshot) => {
            const allGames: Game[] = [];
            snapshot.forEach(doc => {
                allGames.push({
                    name: doc.data().name,
                    eventDocumentId: doc.data().eventDocumentId,
                    documentId: doc.id
                });
            });
            setGames(allGames);
        });

        return () => {
            unsub();
        }
    });

    useEffect(() => {
        if (hasActiveEvent && activeEvent !== null) {
            setGamesInThisEvent(() => games.filter(g => g.eventDocumentId === activeEvent.documentId));
        }
    }, [activeEvent, games]);

    return (
        <GameContext.Provider value={{
            allGames: games,
            gamesInThisEvent: gamesInThisEvent
        }}>
            {props.children}
        </GameContext.Provider>
    )
}

export default GameContextProvider;
export {GameContext};