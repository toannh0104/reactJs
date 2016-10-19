function updateState(message) {
    console.log("Update state: " + message);
}
function boards(state = [], action) {
    switch (action.type) {
        case 'FETCH_BOARDS' :
            console.log("fetch boards !!!");
            return action.payload
            break;  
        default:
            return state;
    }
}

export default boards;
