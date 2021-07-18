import FriendList from '../../components/FriendList/FriendList';
import MessageList from '../../components/MessageList/MessageList';
import styles from './MainPage.module.css';

function MainPage() {
    return (
        <div className={styles.container}>
            <FriendList />
            <MessageList />
        </div>
    );
}

export default MainPage;
