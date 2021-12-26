import { SET_NICKNAME } from '../action/actionTypes';

const defaultState = {
    nickname: ""
};

function meReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_NICKNAME:
            return {
                ...state,
                nickname: action.payload,
            };
        default:
            return state;
    }
}

export default meReducer;
