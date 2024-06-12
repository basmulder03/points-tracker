import styles from "./SignIn.module.less"
import {SubmitHandler, useForm} from "react-hook-form";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../firebase/initializeFirebase.ts";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {UserContext} from "../../contexts/UserContext.tsx";

type Inputs = {
    email: string;
    password: string;
}

const SignIn = () => {
    const navigate = useNavigate();
    const {isLoggedIn, user, loading} = useContext(UserContext);

    const {
        register,
        handleSubmit,
        formState: {dirtyFields}
    } = useForm<Inputs>({mode: "all"});
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        navigate("/points");
    }

    useEffect(() => {
        if (!loading && isLoggedIn) {
            navigate('/points')
        }
    }, [loading, isLoggedIn, user]);

    return (
        <div className={styles.container}>
            <div className={styles.signInBox}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <input type="email" className={styles.input}
                               placeholder="Email" {...register("email", {required: true})} />
                        <input type="password" className={styles.input}
                               placeholder="Password" {...register("password", {required: true})} />
                    </div>
                    <input type="submit" className={styles.submitButton}
                           disabled={Object.keys(dirtyFields).length === 0}/>
                </form>
            </div>
            <div className={styles.copyright}>&copy; 2024 Bas Mulder</div>
        </div>
    )
}

export default SignIn;