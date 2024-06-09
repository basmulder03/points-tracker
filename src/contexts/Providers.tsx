import UserContextProvider from "./UserContext.tsx";
import EventContextProvider from "./EventContext.tsx";
import TeamContextProvider from "./TeamContext.tsx";
import GameContextProvider from "./GameContext.tsx";
import PointContextProvider from "./PointContext.tsx";
import DashboardContextProvider from "./DashboardContext.tsx";

const Providers = (props: React.PropsWithChildren) => {
    return (
        <UserContextProvider>
            <EventContextProvider>
                <TeamContextProvider>
                    <GameContextProvider>
                        <PointContextProvider>
                            <DashboardContextProvider>
                                {props.children}
                            </DashboardContextProvider>
                        </PointContextProvider>
                    </GameContextProvider>
                </TeamContextProvider>
            </EventContextProvider>
        </UserContextProvider>
    )
}

export default Providers;