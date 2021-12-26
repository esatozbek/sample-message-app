import { SELECT_FRIEND, SEND_MESSAGE } from '../action/actionTypes';

const defaultState = {
    byId: {
        General: {
            name: 'General',
            messages: [],
        },
        'Friend 1': {
            name: 'Friend 1',
            messages: ['message1', 'message2', 'message3'],
        },
        'Friend 2': {
            name: 'Friend 2',
            messages: ['message4', 'message5', 'message6'],
        },
        'Friend 3': {
            name: 'Friend 3',
            messages: ['message7', 'message8', 'message9'],
        },
    },
    friendList: ['General', 'Friend 1', 'Friend 2', 'Friend 3'],
    selectedFriend: -1,
};

function friendsReducer(state = defaultState, action) {
    switch (action.type) {
        case SELECT_FRIEND:
            return {
                ...state,
                selectedFriend: action.payload,
            };
        case SEND_MESSAGE:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.receiver]: {
                        ...state.byId[action.payload.receiver],
                        messages: [
                            action.payload.id,
                            ...state.byId[action.payload.receiver].messages,
                        ],
                    },
                },
            };
        default:
            return state;
    }
}

export default friendsReducer;
