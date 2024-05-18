import {useContext, useEffect} from "react";
import {UserContext} from "../../contexts/UserContext.tsx";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {signOut} from "firebase/auth";
import {auth} from "../../firebase/initializeFirebase.ts";
import styles from "./Settings.module.less"

const Settings = () => {
    const {user, isLoggedIn} = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    const logOut = async () => {
        await signOut(auth);
    }

    const navigateToSetting = async (setting: "teams" | "parts") => {
        navigate(`/settings/${setting}`);
    }

    const hasSubPath = (subPath: "teams" | "parts"): boolean => location.pathname.toLowerCase().includes(subPath.toLowerCase());

    useEffect(() => {
        if (!isLoggedIn) navigate("/login");

    }, [isLoggedIn]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                Welkom, {user?.email}
                <button onClick={logOut} className={styles.button}>SignOut</button>
            </div>
            <div className={styles.navigator}>
                <div className={`${styles.link} ${hasSubPath("teams") && styles.active}`} onClick={() => navigateToSetting("teams")}>
                    Team Settings
                </div>
                <div className={`${styles.link} ${hasSubPath("parts") && styles.active}`} onClick={() => navigateToSetting("parts")}>
                    Parts
                </div>
            </div>
            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    )
}

export default Settings;