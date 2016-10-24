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
  console.log("dologininaction")
  Trello.authorize({
      type: "popup",
      success: onAuthorised
      //error: store.dispatch({type: "DO_LOGIN", payload: false})
  })
    //return store.dispatch({type: "DO_LOGIN", payload: newState})    
}

// update logged status
export function doLogout(newState) {
  console.log("dologininaction")
  Trello.deauthorize();
  store.dispatch({type: "UPDATE_LOGGED_STATE", payload: false}) 
}


export function onAuthorised(argument) {
  store.dispatch({type: "UPDATE_LOGGED_STATE", payload: true}) 
  Trello.get("members/me/boards")
   .then((boards => {
      console.log("hihi")
      store.dispatch({type: "FETCH_BOARDS", payload: boards});
   })); 
}


// fetchLists
export function fetchLists(boardId) {
  console.log("fetch lists")
  var uri = "/boards/"+boardId+"/lists";
  Trello.get(uri)
  .then((lists => {
    store.dispatch({type: "FETCH_LISTS", payload: lists});
    return lists;
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