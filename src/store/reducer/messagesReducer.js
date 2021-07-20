import { SEND_MESSAGE } from '../action/actionTypes';

const defaultState = {
    byId: {
        message1: {
            id: 'message1',
            content: 'Message 1 from friend 1',
            senderId: 2,
            receiverId: 1,
        },
        message2: {
            id: 'message2',
            content: 'Message 2 from friend 1',
            senderId: 1,
            receiverId: 2,
        },
        message3: {
            id: 'message3',
            content: 'Message 3 from friend 1',
            senderId: 2,
            receiverId: 1,
        },
        message4: {
            id: 'message4',
            content: 'Message 1 from friend 2',
            senderId: 3,
            receiverId: 1,
        },
        message5: {
            id: 'message5',
            content: 'Message 2 from friend 2',
            senderId: 1,
            receiverId: 3,
        },
        message6: {
            id: 'message6',
            content: 'Message 3 from friend 2',
            senderId: 3,
            receiverId: 1,
        },
        message7: {
            id: 'message7',
            content: 'Message 1 from friend 3',
            senderId: 4,
            receiverId: 1,
        },
        message8: {
            id: 'message8',
            content: 'Message 2 from friend 3',
            senderId: 1,
            receiverId: 4,
        },
        message9: {
            id: 'message9',
            content: 'Message 3 from friend 3',
            senderId: 4,
            receiverId: 1,
        },
    },
};

function messagesReducer(state = defaultState, action) {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.id]: action.payload,
                },
            };
        default:
            return state;
    }
}

export default messagesReducer;
