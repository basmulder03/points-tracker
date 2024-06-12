import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../contexts/UserContext.tsx";
import {Link, useNavigate} from "react-router-dom";
import {signOut} from "firebase/auth";
import {auth} from "../../firebase/initializeFirebase.ts";
import styles from "./Points.module.less";
import {GameContext} from "../../contexts/GameContext.tsx";
import {EventContext} from "../../contexts/EventContext.tsx";
import {MdOutlineArrowForwardIos} from "react-icons/md";
import {TeamContext} from "../../contexts/TeamContext.tsx";
import {addPointsForGame} from "../../firebase/services/pointService.ts";
import {PointContext} from "../../contexts/PointContext.tsx";

const Points = () => {
    const navigate = useNavigate();
    const {isLoggedIn, loading, user} = useContext(UserContext);

    const {hasActiveEvent, activeEvent} = useContext(EventContext);
    const {gamesInThisEvent} = useContext(GameContext);
    const {teamsInThisEvent} = useContext(TeamContext);
    const points = useContext(PointContext);

    const [selectedGame, setSelectedGame] = useState<string | null>(null);

    const [pointsForGame, setPointsForGame] = useState<{
        [gameId: string]: {
            [teamId: string]: {
                amount: number | null,
                documentId: string | null
            }
        }
    }>({});

    useEffect(() => {
        if (!loading && !isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn]);

    useEffect(() => {
        const newObject: {
            [gameId: string]: {
                [teamId: string]: {
                    amount: number,
                    documentId: string
                }
            }
        } = {};

        points.forEach(point => {
            newObject[point.gameDocumentId] = {
                ...newObject[point.gameDocumentId],
                [point.teamDocumentId]: {
                    ...newObject[point.teamDocumentId],
                    amount: point.amount,
                    documentId: point.documentId,
                }
            }
        });

        setPointsForGame(() => newObject);

    }, [points]);

    const logOut = async () => {
        await signOut(auth);
    }

    const navigateToGame = (gameId: string | null) => {
        setSelectedGame(() => gameId);
    }

    const updatePoints = (gameId: string, teamId: string, value: number) => {
        setPointsForGame(prevPoints => {
            // Ensure the gameId exists
            const gamePoints = prevPoints[gameId] ? {...prevPoints[gameId]} : {};

            // Ensure the teamId exists within the gameId
            const teamPoints: {
                amount: number | null,
                documentId: string | null
            } = gamePoints[teamId] ? {...gamePoints[teamId]} : {
                amount: null,
                documentId: null
            };

            // Update the amount
            teamPoints.amount = isNaN(value) ? null : value;

            // Reconstruct the nested structure
            gamePoints[teamId] = teamPoints;
            return {
                ...prevPoints,
                [gameId]: gamePoints
            };
        });
    };

    const getValueOrNull = (gameId: string | null, teamId: string | null): number | null => {
        const game = (gameId ?? "" in pointsForGame) ? pointsForGame[gameId ?? ""] : null;
        if (game === null || game === undefined) return null;
        const team = (teamId ?? "" in pointsForGame[gameId!!]) ? pointsForGame[gameId!!][teamId ?? ""] : null;
        if (team === null || team === undefined) return null;
        return pointsForGame[gameId ?? ""][teamId ?? ""]?.amount;
    }

    const persistPoints = async () => {
        if (selectedGame !== null && hasActiveEvent) {
            const pointArrayObject: { points: number, teamId: string, documentId: string | null }[] = [];

            Object.keys(pointsForGame[selectedGame] || {}).forEach((teamId) => pointArrayObject.push({
                teamId,
                points: pointsForGame[selectedGame][teamId]?.amount!!,
                documentId: pointsForGame[selectedGame][teamId]?.documentId
            }));
            await addPointsForGame(activeEvent!!.documentId, selectedGame, pointArrayObject)
        }
        setSelectedGame(null);
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                Welkom, {user?.email}
                <div>
                    <Link to="/" className={styles.link}>Dashboard</Link>
                    <Link className={styles.link} to="/settings">Settings</Link>
                    <button onClick={logOut} className={styles.button}>Sign out</button>
                </div>
            </div>
            {
                hasActiveEvent && (<>
                        <div className={styles.eventName} onClick={() => setSelectedGame(null)}>
                            <p>{activeEvent?.name}</p>
                        </div>
                        {
                            selectedGame === null ? gamesInThisEvent.map((game) => (
                                <div key={game.documentId} className={styles.game}
                                     onClick={() => navigateToGame(game.documentId)}>
                                    {game.name}
                                    <MdOutlineArrowForwardIos/>
                                </div>
                            )) : (
                                <>
                                    <div
                                        className={styles.gameName}>{gamesInThisEvent.find(g => g.documentId === selectedGame)?.name}
                                    </div>
                                    {
                                        teamsInThisEvent.map((team) => (
                                            <div key={team.documentId} className={styles.game}>
                                                {team.name}
                                                <input type="number" className={styles.input}
                                                       placeholder={`Type here the points for ${team.name}`}
                                                       onChange={(e) => updatePoints(selectedGame, team.documentId, parseInt(e.target.value))}
                                                       value={getValueOrNull(selectedGame, team.documentId) || ""}
                                                />
                                            </div>
                                        ))
                                    }
                                    <button className={styles.submitButton}
                                            disabled={Object.keys(pointsForGame[selectedGame] || {}).length !== teamsInThisEvent.length || !hasActiveEvent}
                                            onClick={() => persistPoints()}
                                    >Save
                                    </button>
                                </>
                            )
                        }
                    </>
                )
            }
            <div className={styles.copyright}>&copy; 2024 Bas Mulder</div>
        </div>
    )
}

export default Points;