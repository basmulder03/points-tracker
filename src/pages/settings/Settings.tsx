import {useContext, useEffect} from "react";
import {UserContext} from "../../contexts/UserContext.tsx";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {signOut} from "firebase/auth";
import {auth} from "../../firebase/initializeFirebase.ts";
import styles from "./Settings.module.less"

const Settings = () => {
    const {user, isLoggedIn, loading} = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    const logOut = async () => {
        await signOut(auth);
    }

    const navigateToSetting = async (setting: "teams" | "games") => {
        navigate(`/settings/${setting}`);
    }

    const hasSubPath = (subPath: "teams" | "games"): boolean => location.pathname.toLowerCase().includes(subPath.toLowerCase());

    useEffect(() => {
        if (!loading && !isLoggedIn) navigate("/login");

    }, [isLoggedIn]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                Welkom, {user?.email}
                <div>
                    <Link to="/points" className={styles.link}>Points</Link>
                    <button onClick={logOut} className={styles.button}>SignOut</button>
                </div>
            </div>
            <div className={styles.navigator}>
                <div className={`${styles.link} ${hasSubPath("teams") && styles.active}`}
                     onClick={() => navigateToSetting("teams")}>
                    Team Settings
                </div>
                <div className={`${styles.link} ${hasSubPath("games") && styles.active}`}
                     onClick={() => navigateToSetting("games")}>
                    Games
                </div>
            </div>
            <div className={styles.content}>
                <Outlet/>
            </div>
            <div className={styles.copyright}>&copy; 2024 Bas Mulder</div>
        </div>
    )
}

export default Settings;