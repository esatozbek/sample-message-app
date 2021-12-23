import { useSelector } from 'react-redux';
import { PAGES } from './constants';
import styles from './App.module.css';

function App() {
    const { location } = useSelector((state) => state.location);
    const Page = PAGES[location];
    return (
        <div className={styles.container}>
            <Page />
        </div>
    );
}

export default App;
