import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MessageListItem from './views/MessageListItem/MessageListItem';
import Button from '../../components/Button/Button';
import TextInput from '../TextInput/TextInput';
import { sendMessage } from '../../store/action/messageActions';
import { USER_ID, BLANK_USER_ID } from '../../constants';
import styles from './MessageList.module.css';

function MessageList() {
    const [message, setMessage] = useState('');
    const messagesById = useSelector((state) => state.messages.byId);
    const { selectedFriend, byId: friendsById } = useSelector((state) => state.friends);
    const dispatch = useDispatch();

    const onMessageChange = useCallback((e) => setMessage(e.target.value), [setMessage]);

    const onSendMessage = useCallback(() => {
        if (message === '') {
            return;
        }
        dispatch(sendMessage(USER_ID, selectedFriend, message));
        setMessage('');
    }, [dispatch, selectedFriend, message, setMessage]);

    if (selectedFriend === BLANK_USER_ID) {
        return <div className={styles.container}>Select a friend from left side</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.listContainer}>
                {friendsById[selectedFriend] &&
                    friendsById[selectedFriend].messages
                        .map((messageId) => messagesById[messageId])
                        .map((message) => (
                            <MessageListItem
                                key={message.id}
                                me={message.senderId === USER_ID}
                                content={message.content}
                            />
                        ))}
            </div>
            <div className={styles.sendMessageContainer}>
                <TextInput value={message} onChange={onMessageChange} />
                <Button text="Send Message" onClick={onSendMessage} />
            </div>
        </div>
    );
}

export default MessageList;
