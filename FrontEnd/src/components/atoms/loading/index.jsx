import styles from "./styles.module.css"

function Loading(){
    return (
        <div className={styles.container}>
            <div className={styles.loading}></div>
        </div>
    )
}

export default Loading