var initState = {
    boards: [],
    lists: [],
    cards: [],
    login: false
}
function trello(state = initState, action) {
    switch (action.type) {
        case 'FETCH_BOARDS' :
            console.log("fetch boards !!!");
            return {...state, boards:action.payload}
            break;  

        case 'FETCH_CARDS' :
        console.log("fetch cards !!!");
        return {...state, cards: action.payload}
        break; 

        case 'UPDATE_LOGGED_STATE' :
            console.log("UPDATE_LOGGED_STATE");                          
            return {...state, login: action.payload}
            break;  

		case 'DO_LOGIN' :
            console.log("DO_LOGIN");
            return {...state, login: action.payload}
            break;

 		case 'FETCH_LISTS' :
            console.log("fetch lists !!!");            
            return {...state, lists: action.payload}
            break;  
        default:
            return state;
    }
}
export default trello;
