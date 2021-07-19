import MessageListItem from './views/MessageListItem/MessageListItem';
import Button from '../../components/Button/Button';
import TextInput from '../TextInput/TextInput';
import styles from './MessageList.module.css';

function MessageList() {
    return (
        <div className={styles.container}>
            <div className={styles.listContainer}>
                {Array(10)
                    .fill(0)
                    .map((_, i) => (
                        <MessageListItem me={i % 2 === 0} content={`content ${i}`} />
                    ))}
            </div>
            <div className={styles.sendMessageContainer}>
                <TextInput />
                <Button />
            </div>
        </div>
    );
}

export default MessageList;
