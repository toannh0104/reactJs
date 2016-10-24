import store from '../store';

// update logged status
export function updateLogged(newState) {
    return {
        type: 'UPDATE_LOGGED_STATE',
        newState: newState
    }
}

// update logged status
export function doLogin(newState) {
    Trello.authorize({
        type: "popup",
        success: onAuthorised
    })
}

// update logged status
export function doLogout(newState) {
    Trello.deauthorize();
    store.dispatch({type: "UPDATE_LOGGED_STATE", payload: false})
}


export function onAuthorised(argument) {
    store.dispatch({type: "UPDATE_LOGGED_STATE", payload: true})
    Trello.get("members/me/boards")
        .then((boards => {
            store.dispatch({type: "FETCH_BOARDS", payload: boards});
        }));
}


// fetchLists
export function fetchLists(boardId) {
    console.log("fetch lists")
    var uri = "/boards/" + boardId + "/lists";
    var uriCards = "/boards/" + boardId + "/cards";
    Trello.get(uri).then((lists => {
        store.dispatch({type: "FETCH_LISTS", payload: lists});
    }))

    Trello.get(uriCards).then((cards => {
        store.dispatch({type: "FETCH_CARDS", payload: cards});
    }))
}
// fetch Cards
export function fetchCards(index, id) {
    console.log("fetch cards");
    console.log(store);

    return {
        type: 'FETCH_CARDS',
        index: index,
        id
    }
}