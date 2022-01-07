import styles from './FriendListItem.module.css';

function FriendListItem({ name, onClick, status }) {
    return (
        <div className={styles.container} onClick={onClick}>
            {name}
            {status && `[${status}]`}
        </div>
    );
}

export default FriendListItem;
