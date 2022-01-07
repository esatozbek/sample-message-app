import {
    SELECT_FRIEND,
    SEND_MESSAGE,
    ADD_FRIEND,
    SET_FRIENDS,
    DELETE_FRIEND,
    MARK_ONLINE_FRIEND,
    SET_WRITING,
} from '../action/actionTypes';

const GENERAL = {
    name: 'General',
    messages: [],
    writingFriends: {},
};

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
                byId: {
                    ...state.byId,
                },
                selectedFriend: action.payload,
            };
        case ADD_FRIEND:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload]: {
                        name: action.payload,
                        status: 'ONLINE',
                        messages: [],
                        writingFriends: {},
                    },
                },
                friendList: [...state.friendList, action.payload],
            };
        case DELETE_FRIEND: {
            const byIdCopy = { ...state.byId };
            delete byIdCopy[action.payload];
            return {
                ...state,
                byId: byIdCopy,
                friendList: state.friendList.fillter((friend) => friend === action.payload),
                selectedFriend:
                    state.selectedFriend === action.payload ? GENERAL.name : state.selectedFriend,
            };
        }
        case SET_FRIENDS:
            return {
                ...state,
                byId: {
                    [GENERAL.name]: GENERAL,
                    ...action.payload
                        .map((friend) => ({
                            name: friend.name,
                            messages: [],
                            status: friend.status,
                            writingFriends: [],
                        }))
                        .reduce((acc, friend) => ({ ...acc, [friend.name]: friend }), {}),
                },
                friendList: [GENERAL.name, ...action.payload.map((friend) => friend.name)],
            };
        case SEND_MESSAGE:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.conversation]: {
                        ...state.byId[action.payload.conversation],
                        messages: [
                            action.payload.id,
                            ...state.byId[action.payload.conversation].messages,
                        ],
                    },
                },
            };
        case MARK_ONLINE_FRIEND:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.nick]: {
                        ...state.byId[action.payload.nick],
                        status: action.payload.status,
                    },
                },
            };
        case SET_WRITING:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.channel]: {
                        ...state.byId[action.payload.channel],
                        writingFriends: action.payload.isWriting
                            ? {
                                  ...state.byId[action.payload.channel].writingFriends,
                                  [action.payload.nickname]: true,
                              }
                            : {
                                  ...state.byId[action.payload.channel].writingFriends,
                                  [action.payload.nickname]: false,
                              },
                    },
                },
            };
        default:
            return state;
    }
}

export default friendsReducer;
