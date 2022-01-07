import {
    SELECT_FRIEND,
    ADD_FRIEND,
    SET_FRIENDS,
    DELETE_FRIEND,
    MARK_ONLINE_FRIEND,
    SET_WRITING,
} from './actionTypes';

export function selectFriend(friendName) {
    return {
        type: SELECT_FRIEND,
        payload: friendName,
    };
}

export function addFriend(nickname) {
    return {
        type: ADD_FRIEND,
        payload: nickname,
    };
}

export function deleteFriend(nickname) {
    return {
        type: DELETE_FRIEND,
        payload: nickname,
    };
}

export function setFriends(friendList) {
    return {
        type: SET_FRIENDS,
        payload: friendList,
    };
}

export function markOnlineFriend({ nick, status }) {
    return {
        type: MARK_ONLINE_FRIEND,
        payload: { nick, status },
    };
}

export function setWriting({ channel, nickname, isWriting }) {
    return {
        type: SET_WRITING,
        payload: {
            channel,
            nickname,
            isWriting,
        },
    };
}
