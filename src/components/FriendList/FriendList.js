import FriendListItem from './views/FriendListItem/FriendListItem';
import styles from './FriendList.module.css';

function FriendList() {
    return (
        <div className={styles.container}>
            {Array(10)
                .fill(0)
                .map(() => (
                    <FriendListItem />
                ))}
        </div>
    );
}

export default FriendList;
