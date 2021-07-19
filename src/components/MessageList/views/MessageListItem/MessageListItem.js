import styles from './MessageListItem.module.css';
import classNames from 'classnames';

function MessageListItem({ me, content, date }) {
    return (
        <div className={classNames(styles.container, { [styles.me]: me })}>
            <div className={styles.content}>{content}</div>
            <div className={styles.date}>27.12.2021 12:12</div>
        </div>
    );
}

export default MessageListItem;
