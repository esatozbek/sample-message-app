import { SELECT_FRIEND } from './actionTypes';

export function selectFriend(friendName) {
    return {
        type: SELECT_FRIEND,
        payload: friendName,
    };
}
