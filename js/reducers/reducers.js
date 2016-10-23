import {SET_AUTH, SET_AUTH_ENTITY} from '../constants/AppConstants';
const assign = Object.assign || require('object.assign');
import auth from '../utils/auth';

const initialState = {
    formState: {
        username: '',
        password: ''
    },
    currentlySending: false,
    loggedEntity: null,
    loggedIn: auth.loggedIn()
};

export function homeReducer(state = initialState, action) {
    switch (action.type) {
        case SET_AUTH:
            return assign({}, state, {
                loggedIn: action.newState
            });
            break;
        case SET_AUTH_ENTITY:
            return assign({}, state, {
                loggedEntity: action.entity
            });
            break;

        default:
            return state;
    }
}
