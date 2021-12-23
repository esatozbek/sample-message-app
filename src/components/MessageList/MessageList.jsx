import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MessageListItem from './views/MessageListItem/MessageListItem';
import Button from '../../components/Button/Button';
import TextInput from '../TextInput/TextInput';
import { sendMessage } from '../../store/action/messageActions';
import { USER_ID, BLANK_USER_ID } from '../../constants';
import socket from '../../socket';
import styles from './MessageList.module.css';

function NotificationListItem({content}) {
    return <div>{content}</div>;
}

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
        socket.emit('sendMessage', JSON.stringify(sendMessage(USER_ID, selectedFriend, message)));
        setMessage('');
    }, [selectedFriend, message, setMessage]);

    useEffect(() => {
        socket.on('receiveMessage', (evt) => {
            console.log(evt);
            const event = JSON.parse(evt);
            dispatch(event);
        });
    }, [dispatch]);

    if (selectedFriend === BLANK_USER_ID) {
        return <div className={styles.container}>Select a friend from left side</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.listContainer}>
                {friendsById[selectedFriend] &&
                    friendsById[selectedFriend].messages
                        .map((messageId) => messagesById[messageId])
                        .map((message) =>
                            message.type === 'MESSAGE' ? (
                                <MessageListItem
                                    key={message.id}
                                    me={message.senderId === USER_ID}
                                    content={message.content}
                                />
                            ) : (
                                <NotificationListItem key={message.id} content={message.content} />
                            )
                        )}
            </div>
            <div className={styles.sendMessageContainer}>
                <TextInput value={message} onChange={onMessageChange} />
                <Button text="Send Message" onClick={onSendMessage} />
            </div>
        </div>
    );
}

export default MessageList;
