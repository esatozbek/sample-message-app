import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FriendListItem from './views/FriendListItem/FriendListItem';
import { selectFriend } from '../../store/action/friendActions';
import styles from './FriendList.module.css';

function FriendList() {
    const { byId: friendsById, friendList, selectedFriend } = useSelector((state) => state.friends);
    const dispatch = useDispatch();
    console.log(selectedFriend);

    const onSelectFriend = useCallback(
        (friendId) => {
            dispatch(selectFriend(friendId));
        },
        [dispatch]
    );

    return (
        <div className={styles.container}>
            {friendList
                .map((friendId) => friendsById[friendId])
                .map((friend) => (
                    <FriendListItem
                        key={friend.id}
                        name={friend.name}
                        onClick={() => onSelectFriend(friend.id)}
                    />
                ))}
        </div>
    );
}

export default FriendList;
