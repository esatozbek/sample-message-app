import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MessageListItem from './views/MessageListItem/MessageListItem';
import Button from '../../components/Button/Button';
import TextInput from '../TextInput/TextInput';
import { sendMessage } from '../../store/action/messageActions';
import { BLANK_USER_ID } from '../../constants';
import initSocket from '../../socket';
import styles from './MessageList.module.css';

function NotificationListItem({ content }) {
    return <div>{content}</div>;
}

function MessageList() {
    const [message, setMessage] = useState('');
    const messagesById = useSelector((state) => state.messages.byId);
    const { selectedFriend, byId: friendsById } = useSelector((state) => state.friends);
    const { nickname } = useSelector((state) => state.me);
    const dispatch = useDispatch();
    const socket = initSocket();

    const onMessageChange = useCallback(
        (e) => {
            setMessage(e.target.value);
            socket.emit('startedWriting', selectedFriend);
        },
        [socket, selectedFriend]
    );

    const handleSendMessage = useCallback(() => {
        if (message === '') {
            return;
        }
        dispatch(sendMessage(selectedFriend, nickname, selectedFriend, message));
        if (selectedFriend === 'General') {
            socket.emit('sendMessage', message);
        } else {
            socket.emit('sendPrivateMessage', selectedFriend, message);
        }
        setMessage('');
    }, [message, dispatch, nickname, selectedFriend, socket]);

    useEffect(() => {
        socket.on('message', (sender, receiver, message) => {
            dispatch(sendMessage('General', sender, receiver, message));
        });

        socket.on('privateMessage', (sender, receiver, message) => {
            dispatch(sendMessage(sender, sender, receiver, message));
        });

        return () => {
            socket.off('message');
            socket.off('privateMessage');
            socket.off('startedWriting');
        };
    }, [dispatch, nickname, selectedFriend, socket]);

    const renderWritingStatus = useCallback(() => {
        const writingFriends = Object.keys(friendsById[selectedFriend].writingFriends).filter(
            (friend) => friendsById[selectedFriend].writingFriends[friend]
        );
        if (writingFriends.length === 0) {
            return ' ';
        }
        return writingFriends.join(', ') + ' writing...';
    }, [friendsById, selectedFriend]);

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
                                    me={message.sender === nickname}
                                    content={message.content}
                                    sender={message.sender}
                                />
                            ) : (
                                <NotificationListItem key={message.id} content={message.content} />
                            )
                        )}
            </div>
            <div className={styles.sendMessageContainer}>
                <TextInput
                    value={message}
                    onChange={onMessageChange}
                    onEnterPress={handleSendMessage}
                />
                <Button text="Send Message" onClick={handleSendMessage} />
            </div>
            <div>{renderWritingStatus()}</div>
        </div>
    );
}

export default MessageList;
