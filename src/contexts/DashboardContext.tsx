import {createContext, useContext, useEffect, useState} from "react";
import {EventContext} from "./EventContext.tsx";
import {TeamContext} from "./TeamContext.tsx";
import {GameContext} from "./GameContext.tsx";
import {PointContext} from "./PointContext.tsx";
import {calculateRanking} from "../helpers/calculateRanking.ts";

interface DashboardContextInterface {
    [teamId: string]: {
        teamName: string,
        totalPoints: number,
        games: {
            [gameId: string]: {
                gameName: string,
                points: number
            }
        },
        rank: number;
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
                    games: {},
                    rank: -1
                }

                gamesInThisEvent.forEach(game => {
                    newObject[team.documentId].games[game.documentId] = {
                        gameName: game.name,
                        points: points.find(p => p.eventDocumentId === activeEvent.documentId && p.gameDocumentId === game.documentId && p.teamDocumentId === team.documentId)?.amount ?? 0
                    }
                });
            });

            Object.keys(newObject).forEach(key => {
                newObject[key].rank = calculateRanking(Object.values(newObject).map(obj => obj.totalPoints), newObject[key].totalPoints);
            });

            setData(newObject);
        }
    }, [teamsInThisEvent, gamesInThisEvent, points]);

    return (
        <DashboardContext.Provider value={data}>
            {props.children}
        </DashboardContext.Provider>
    )
}

const getSortedData = (rawData: DashboardContextInterface) => {
    const values = Object.values(rawData);

    values.sort((a, b) => b.totalPoints - a.totalPoints);
    return values;
}

export default DashboardContextProvider;
export {DashboardContext, getSortedData};