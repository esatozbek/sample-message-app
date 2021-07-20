import styles from './FriendListItem.module.css';

function FriendListItem({ name, onClick }) {
    return (
        <div className={styles.container} onClick={onClick}>
            {name}
        </div>
    );
}

export default FriendListItem;
