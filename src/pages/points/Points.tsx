import {useContext, useEffect} from "react";
import {UserContext} from "../../contexts/UserContext.tsx";
import {Link, useNavigate} from "react-router-dom";
import {signOut} from "firebase/auth";
import {auth} from "../../firebase/initializeFirebase.ts";

const Points = () => {
    const navigate = useNavigate();
    const user = useContext(UserContext);


    useEffect(() => {
        if (!user?.uid) {
            navigate("/login");
        }
    }, [user]);

    const logOut = async () => {
        await signOut(auth);
    }

    return (
        <>
            <Link to="/points/team-management">Team Management</Link>
            <button onClick={logOut}>Sign out</button>
        </>
    )
}

export default Points;