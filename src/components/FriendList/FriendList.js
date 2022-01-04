import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import initSocket from '../../socket';
import FriendListItem from './views/FriendListItem/FriendListItem';
import {
    selectFriend,
    addFriend,
    setFriends,
    markOnlineFriend,
} from '../../store/action/friendActions';
import { sendMessage } from '../../store/action/messageActions';
import styles from './FriendList.module.css';

function FriendList() {
    const { byId: friendsById, friendList } = useSelector((state) => state.friends);
    const dispatch = useDispatch();
    const socket = initSocket();

    useEffect(() => {
        socket.on('selectFriend', (msg) => {
            const event = JSON.parse(msg);
            dispatch(event);
        });

        socket.on('newUserConnected', (nick) => {
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
        });

        socket.on('onlineUser', (nick) => {
            dispatch(markOnlineFriend({ nick, status: 'ONLINE' }));
        });

        socket.on('userDisconnect', (nick) => {
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
        });

        socket.on('friendList', (friendListJSON) => {
            console.log(friendListJSON);
            const friendList = JSON.parse(friendListJSON);
            dispatch(setFriends(friendList));
        });
    }, [dispatch, socket]);

    const onSelectFriend = useCallback(
        (friendName) => {
            dispatch(selectFriend(friendName));
        },
        [dispatch]
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
