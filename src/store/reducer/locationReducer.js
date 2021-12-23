import { LOCATE_MAIN_SCREEN } from '../action/actionTypes';
import { WELCOME_SCREEN, MAIN_SCREEN } from '../../constants';

const defaultState = {
    location: WELCOME_SCREEN,
};

function locationReducer(state = defaultState, action) {
    switch (action.type) {
        case LOCATE_MAIN_SCREEN:
            return {
                ...state,
                location: MAIN_SCREEN,
            };
        default:
            return state;
    }
}

export default locationReducer;
