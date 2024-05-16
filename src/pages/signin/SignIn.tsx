import styles from "./SignIn.module.less"
import {SubmitHandler, useForm} from "react-hook-form";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../firebase/initializeFirebase.ts";

type Inputs = {
    email: string;
    password: string;
}

const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: {dirtyFields}
    } = useForm<Inputs>({mode: "all"});
    const onSubmit: SubmitHandler<Inputs> = (data) =>
        signInWithEmailAndPassword(auth, data.email, data.password)

    return (
        <div className={styles.container}>
            <div className={styles.signInBox}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <input type="email" className={styles.input} placeholder="Email" {...register("email", {required: true})} />
                        <input type="password" className={styles.input} placeholder="Password" {...register("password", {required: true})} />
                    </div>
                    <input type="submit" className={styles.submitButton} disabled={Object.keys(dirtyFields).length === 0} />
                </form>
            </div>
        </div>
    )
}

export default SignIn;