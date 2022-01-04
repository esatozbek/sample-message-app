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

let writingTimeoutId;

function MessageList() {
    const [message, setMessage] = useState('');
    const [writeStatus, setWriteStatus] = useState('');
    const messagesById = useSelector((state) => state.messages.byId);
    const { selectedFriend, byId: friendsById } = useSelector((state) => state.friends);
    const { nickname } = useSelector((state) => state.me);
    const dispatch = useDispatch();
    const socket = initSocket();
    console.log('selectedFriend', selectedFriend);
    const onMessageChange = useCallback(
        (e) => {
            if (writingTimeoutId) {
                clearTimeout(writingTimeoutId);
            }

            setMessage(e.target.value);
            socket.emit('startedWriting');

            writingTimeoutId = setTimeout(() => {
                socket.emit('endWriting');
            }, 1000);
        },
        [setMessage, socket]
    );

    const handleSendMessage = useCallback(() => {
        if (message === '') {
            return;
        }
        if (writingTimeoutId) {
            clearTimeout(writingTimeoutId);
            socket.emit('endWriting');
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

        socket.on('startedWriting', (nickname) => {
            setWriteStatus(`${nickname} is writing...`);
        });

        socket.on('endWriting', () => {
            setWriteStatus('');
        });

        return () => {
            console.log('socket listeners removed');
            socket.removeAllListeners();
        };
    }, [dispatch, nickname, selectedFriend, socket]);

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
            <div>{writeStatus}</div>
        </div>
    );
}

export default MessageList;
