function updateState(message) {
    console.log("Update state: " + message);
}
function cards(state = [], action) {
    switch (action.type) {
        case 'FETCH_CARDS' :
            console.log("fetch cards !!!");
            return action.payload
            break;  
        default:
            return state;
    }
}

export default cards;
