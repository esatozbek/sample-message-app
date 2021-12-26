import { combineReducers } from 'redux';
import friendsReducer from './friendsReducer';
import messagesReducer from './messagesReducer';
import locationReducer from './locationReducer';
import meReducer from './meReducer';

export default combineReducers({
    friends: friendsReducer,
    messages: messagesReducer,
    location: locationReducer,
    me: meReducer,
});
