var initState = {
    boards: [],
    lists: [],
    cards: [],
    login: false,
    locations: []
}
function trello(state = initState, action) {
    switch (action.type) {
        case 'FETCH_BOARDS' :
            return {...state, boards:action.payload}
            break;  

        case 'FETCH_CARDS' :
        return {...state, cards: action.payload}
        break; 

        case 'UPDATE_LOGGED_STATE' :
            return {...state, login: action.payload}
            break;  

		case 'DO_LOGIN' :
            return {...state, login: action.payload}
            break;

 		case 'FETCH_LISTS' :
            return {...state, lists: action.payload}
            break;  
        default:
            return state;
    }
}
export default trello;
