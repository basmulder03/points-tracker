import {createContext, useEffect, useState} from "react";
import {onAuthStateChanged, User} from "firebase/auth";
import {auth} from "../firebase/initializeFirebase.ts";

const UserContext = createContext<{ user: User, isLoggedIn: boolean, loading: boolean } | {
    user: null,
    isLoggedIn: boolean,
    loading: boolean,
}>({user: null, isLoggedIn: false, loading: true});

const UserContextProvider = (props: React.PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(auth.currentUser !== null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const listener = onAuthStateChanged(auth, user => {
            setUser(user)
            setIsLoggedIn(!!user);
            setIsLoading(false);
        });

        return () => {
            listener();
        }
    }, []);

    return (
        <UserContext.Provider value={{user, isLoggedIn, loading: isLoading}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;
export {UserContext};