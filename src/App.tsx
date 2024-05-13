import Card from "./components/card/Card.tsx";
import styles from "./App.module.less";

function App() {
  return (
    <div className={styles.app}>
        <Card title="test" />
    </div>
  )
}

export default App
