import {SET_AUTH, SET_AUTH_ENTITY} from '../constants/AppConstants';
import {browserHistory} from 'react-router';
import auth from '../utils/auth';

export function login() {
    console.log("Action login")
    return (dispatch) => Promise.all([
        Trello.authorize({
            type: "popup",
            success: console.log("OKOKOKOKOK")
        })
    ]);
    // return (dispatch) => {
    //     console.log("return")
    //     auth.login((success, err, entity) => {
    //         dispatch(setAuthState(success));
    //         console.log("success: "+success);
    //         if (success === true) {
    //             forwardTo('/dashboard');
    //             dispatch(setAuthEntityState(entity));
    //         } else {
    //             forwardTo('/');
    //         }
    //     });
    // }
}

function onAuthorize () {

    Trello.members.get("me", function (member) {
        console.log(member);
        $(".btn-logged-nav").text("Hi "+member.fullName+"!");
        // self.dispatch(setAuthEntityState(member));
        // self.forwardTo('/dashboard');
    });
};

export function logout() {
    return (dispatch) => {
        dispatch(setAuthState(false));
        browserHistory.replace(null, '/');
    }
}

export function setAuthState(newState) {
    return {type: SET_AUTH, newState};
}

export function setAuthEntityState(entity) {
    return {type: SET_AUTH_ENTITY, entity};
}

function forwardTo(location) {
    console.log('forwardTo(' + location + ')');
    browserHistory.push(location);
}
