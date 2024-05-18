import {createContext, useEffect, useState} from "react";
import {onAuthStateChanged, User} from "firebase/auth";
import {auth} from "../firebase/initializeFirebase.ts";

const UserContext = createContext<{ user: User, isLoggedIn: boolean } | {
    user: null,
    isLoggedIn: boolean
}>({user: null, isLoggedIn: false});

const UserContextProvider = (props: React.PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const listener = onAuthStateChanged(auth, user => {
            console.log({user, isLoggedIn: !!user})
            setUser(user)
            setIsLoggedIn(!!user);
        });

        return () => {
            listener();
        }
    }, []);

    return (
        <UserContext.Provider value={{user, isLoggedIn}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;
export {UserContext};