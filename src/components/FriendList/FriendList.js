import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import socket from '../../socket';
import FriendListItem from './views/FriendListItem/FriendListItem';
import { selectFriend } from '../../store/action/friendActions';
import { sendMessage } from '../../store/action/messageActions';
import styles from './FriendList.module.css';

function FriendList() {
    const { byId: friendsById, friendList } = useSelector((state) => state.friends);
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on('selectFriend', (msg) => {
            console.log('socket message');
            console.log(msg);
            const event = JSON.parse(msg);
            dispatch(event);
        });

        socket.on("newUserConnected", msg => {
            console.log("newUserConnected", msg)
            dispatch(sendMessage(null, 'general', msg, "NOTIFICATION"))
        });
    }, [dispatch]);

    const onSelectFriend = useCallback((friendId) => {
        socket.emit('selectFriend', JSON.stringify(selectFriend(friendId)));
    }, []);

    return (
        <div className={styles.container}>
            {friendList
                .map((friendId) => friendsById[friendId])
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
