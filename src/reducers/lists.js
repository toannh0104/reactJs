function updateState(message) {
    console.log("Update state: " + message);
}
function lists(state = [], action) {
    switch (action.type) {
        case 'FETCH_LISTS' :
            console.log("fetch lists !!!");            
            var board = action.board;
            /*
	        Trello.get("boards/"+action.boardId+"/lists?fields=name,idList", function (response) {
	          state = response
	          console.log("fetched lists");
	        });             
	       
	        axios.get("https://api.trello.com/1/boards/"+action.boardId+"/lists?fields=name,idList&key="+Trello.key() + "&token="+Trello.token())
	        .then((response) => {
	        	console.log(response);
	        	state.lists 
	        }) */
            return state;
            break;  
        default:
            return state;
    }
}

export default lists;
