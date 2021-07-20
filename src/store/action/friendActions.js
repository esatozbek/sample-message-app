import { SELECT_FRIEND } from './actionTypes';

export function selectFriend(friendId) {
    return {
        type: SELECT_FRIEND,
        payload: friendId,
    };
}
