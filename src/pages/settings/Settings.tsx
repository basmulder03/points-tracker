import {useContext, useEffect} from "react";
import {UserContext} from "../../contexts/UserContext.tsx";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {signOut} from "firebase/auth";
import {auth} from "../../firebase/initializeFirebase.ts";
import styles from "./Settings.module.less"
import {MdOutlineLogout, MdOutlineSportsEsports} from "react-icons/md";
import {IoPeopleOutline} from "react-icons/io5";

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
        if (!loading && !isLoggedIn) {
            navigate("/login");
        }

    }, [loading, isLoggedIn]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.welcome}>Welkom, {user?.email}</span>
                <div className={styles.navLinks}>
                    <Link to="/points" className={styles.link}>Points</Link>
                    <button onClick={logOut} className={styles.button}><MdOutlineLogout/> Sign out</button>
                </div>
            </div>
            <div className={styles.navigator}>
                <div className={`${styles.tab} ${hasSubPath("teams") ? styles.active : ""}`}
                     onClick={() => navigateToSetting("teams")}>
                    <IoPeopleOutline/> Team Settings
                </div>
                <div className={`${styles.tab} ${hasSubPath("games") ? styles.active : ""}`}
                     onClick={() => navigateToSetting("games")}>
                    <MdOutlineSportsEsports/> Games
                </div>
            </div>
            <div className={styles.content}>
                <Outlet/>
            </div>
            <div className={styles.copyright}>&copy; 2024-{new Date().getFullYear()} Bas Mulder</div>
        </div>
    )
}

export default Settings;