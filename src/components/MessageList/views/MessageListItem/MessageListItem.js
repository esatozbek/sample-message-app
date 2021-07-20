import styles from './MessageListItem.module.css';
import classNames from 'classnames';

function MessageListItem({ me, content, date }) {
    return (
        <div className={classNames(styles.container, { [styles.me]: me })}>
            <div className={styles.content}>{content}</div>
        </div>
    );
}

export default MessageListItem;
