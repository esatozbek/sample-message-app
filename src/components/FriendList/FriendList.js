import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FriendListItem from './views/FriendListItem/FriendListItem';
import {
    selectFriend,
    addFriend,
    markOnlineFriend,
    setWriting,
} from '../../store/action/friendActions';
import { sendMessage } from '../../store/action/messageActions';
import useSocketEvent from '../../hooks/useSocketEvent';

import styles from './FriendList.module.css';

let writingTimeoutId;

function FriendList() {
    const { byId: friendsById, friendList } = useSelector((state) => state.friends);
    const dispatch = useDispatch();

    const onSelectFriend = useCallback(
        (friendName) => {
            dispatch(selectFriend(friendName));
        },
        [dispatch]
    );

    useSocketEvent(
        'newUserConnected',
        (nick) => {
            dispatch(
                sendMessage(
                    'General',
                    null,
                    'General',
                    `${nick} has joined the chat!`,
                    'NOTIFICATION'
                )
            );
            dispatch(addFriend(nick));
        },
        [dispatch]
    );

    useSocketEvent(
        'onlineUser',
        (nick) => {
            dispatch(markOnlineFriend({ nick, status: 'ONLINE' }));
        },
        [dispatch]
    );

    useSocketEvent(
        'userDisconnect',
        (nick) => {
            dispatch(markOnlineFriend({ nick, status: 'OFFLINE' }));
            dispatch(
                sendMessage(
                    'General',
                    null,
                    'General',
                    `${nick} has disconnected from the chat!`,
                    'NOTIFICATION'
                )
            );
        },
        [dispatch]
    );

    useSocketEvent(
        'startedWriting',
        (channel, nickname) => {
            if (writingTimeoutId) {
                clearTimeout(writingTimeoutId);
            }
            dispatch(setWriting({ nickname, channel, isWriting: true }));

            writingTimeoutId = setTimeout(() => {
                dispatch(setWriting({ nickname, channel, isWriting: false }));
            }, 1000);
        },
        []
    );

    return (
        <div className={styles.container}>
            {friendList
                .map((friendName) => friendsById[friendName])
                .map((friend) => (
                    <FriendListItem
                        key={friend.name}
                        name={friend.name}
                        status={friend.status}
                        onClick={() => onSelectFriend(friend.name)}
                    />
                ))}
        </div>
    );
}

export default FriendList;
