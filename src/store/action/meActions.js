import { SET_NICKNAME } from './actionTypes';

export function setNickname(nickname) {
    return {
        type: SET_NICKNAME,
        payload: nickname,
    };
}
