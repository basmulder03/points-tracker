import styles from "./Card.module.less";

interface CardProps {
    title: string
}

const Card = (props: CardProps) => {
    return (
        <div className={styles.card}>
            {props.title.toUpperCase()}
        </div>
    )
}

export default Card;