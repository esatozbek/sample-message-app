import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import initSocket from '../../socket';
import FriendListItem from './views/FriendListItem/FriendListItem';
import { selectFriend } from '../../store/action/friendActions';
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

        socket.on('newUserConnected', (msg) => {
            console.log('newUserConnected', msg);
            dispatch(sendMessage(null, 'General', msg, 'NOTIFICATION'));
        });

        socket.on('userDisconnect', (msg) => {
            dispatch(sendMessage(null, 'General', msg, 'NOTIFICATION'));
        });
    }, [dispatch, socket]);

    const onSelectFriend = useCallback((friendName) => {
        socket.emit('selectFriend', JSON.stringify(selectFriend(friendName)));
    }, [socket]);

    return (
        <div className={styles.container}>
            {friendList
                .map((friendName) => friendsById[friendName])
                .map((friend) => (
                    <FriendListItem
                        key={friend.name}
                        name={friend.name}
                        onClick={() => onSelectFriend(friend.name)}
                    />
                ))}
        </div>
    );
}

export default FriendList;
