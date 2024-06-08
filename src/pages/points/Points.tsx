import {useContext, useEffect} from "react";
import {UserContext} from "../../contexts/UserContext.tsx";
import {useNavigate} from "react-router-dom";
import {signOut} from "firebase/auth";
import {auth} from "../../firebase/initializeFirebase.ts";

const Points = () => {
    const navigate = useNavigate();
    const user = useContext(UserContext);


    useEffect(() => {
        if (!user.isLoggedIn) {
            navigate("/login");
        }
    }, []);

    const logOut = async () => {
        await signOut(auth);
    }

    return (
        <>
            <button onClick={logOut}>Sign out</button>
        </>
    )
}

export default Points;