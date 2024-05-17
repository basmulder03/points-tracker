import {createContext, useEffect, useState} from "react";
import {onAuthStateChanged, User} from "firebase/auth";
import {auth} from "../firebase/initializeFirebase.ts";

const UserContext = createContext<User | null>(null);

const UserContextProvider = (props: React.PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const listener = onAuthStateChanged(auth, user => setUser(user));

        return () => {
            listener();
        }
    }, []);

    return (
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;
export {UserContext};