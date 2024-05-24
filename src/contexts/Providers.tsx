import UserContextProvider from "./UserContext.tsx";
import EventContextProvider from "./EventContext.tsx";

const Providers = (props: React.PropsWithChildren) => {
    return (
        <UserContextProvider>
            <EventContextProvider>
                {props.children}
            </EventContextProvider>
        </UserContextProvider>
    )
}

export default Providers;