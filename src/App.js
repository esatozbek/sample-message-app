import { Provider } from 'react-redux';
import store from './store/index';
import MainPage from './pages/MainPage/MainPage';
import styles from './App.module.css';

function App() {
    return (
        <div className={styles.container}>
            <Provider store={store}>
                <MainPage />
            </Provider>
        </div>
    );
}

export default App;
