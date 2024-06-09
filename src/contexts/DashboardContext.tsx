import {createContext, useContext, useEffect, useState} from "react";
import {EventContext} from "./EventContext.tsx";
import {TeamContext} from "./TeamContext.tsx";
import {GameContext} from "./GameContext.tsx";
import {PointContext} from "./PointContext.tsx";

interface DashboardContextInterface {
    [teamId: string]: {
        teamName: string,
        totalPoints: number,
        games: {
            [gameId: string]: {
                gameName: string,
                points: number
            }
        }
    }
}

const DashboardContext = createContext<DashboardContextInterface>({});

const DashboardContextProvider = (props: React.PropsWithChildren) => {
    const [data, setData] = useState<DashboardContextInterface>({});

    const {activeEvent, hasActiveEvent} = useContext(EventContext);
    const {teamsInThisEvent} = useContext(TeamContext);
    const {gamesInThisEvent} = useContext(GameContext);
    const points = useContext(PointContext);

    useEffect(() => {
        if (hasActiveEvent && activeEvent !== null) {
            const newObject: DashboardContextInterface = {};

            // Add all the teams
            teamsInThisEvent.forEach(team => {
                newObject[team.documentId] = {
                    teamName: team.name,
                    totalPoints: points.filter(p => p.eventDocumentId === activeEvent.documentId && p.teamDocumentId === team.documentId)
                        .map(p => p.amount).reduce((a, b) => a + b, 0),
                    games: {}
                }

                gamesInThisEvent.forEach(game => {
                    newObject[team.documentId].games[game.documentId] = {
                        gameName: game.name,
                        points: points.find(p => p.eventDocumentId === activeEvent.documentId && p.gameDocumentId === game.documentId)?.amount!!
                    }
                });
            });

            setData(newObject);
        }
    }, [activeEvent, teamsInThisEvent, gamesInThisEvent, points]);

    return (
        <DashboardContext.Provider value={data}>
            {props.children}
        </DashboardContext.Provider>
    )
}

export default DashboardContextProvider;
export {DashboardContext};