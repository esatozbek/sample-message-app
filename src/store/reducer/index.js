import { combineReducers } from 'redux';
import friendsReducer from './friendsReducer';
import messagesReducer from './messagesReducer';
import locationReducer from './locationReducer';

export default combineReducers({
    friends: friendsReducer,
    messages: messagesReducer,
    location: locationReducer,
});
