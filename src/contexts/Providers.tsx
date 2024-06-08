import UserContextProvider from "./UserContext.tsx";
import EventContextProvider from "./EventContext.tsx";
import TeamContextProvider from "./TeamContext.tsx";
import GameContextProvider from "./GameContext.tsx";

const Providers = (props: React.PropsWithChildren) => {
    return (
        <UserContextProvider>
            <EventContextProvider>
                <TeamContextProvider>
                    <GameContextProvider>
                        {props.children}
                    </GameContextProvider>
                </TeamContextProvider>
            </EventContextProvider>
        </UserContextProvider>
    )
}

export default Providers;