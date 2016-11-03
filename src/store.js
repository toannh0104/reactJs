import {createStore, compose, applyMiddleware, combineReducers} from 'redux'
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';
// import the root reducer
import rootReducer from './reducers/index';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const middleware = applyMiddleware(thunk, logger());
const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {}

const store = createStore(
    rootReducer,
    persistedState,
    middleware
)

store.dispatch((dispatch) => {    
    if(null !== localStorage.getItem("trello_token")){
            store.dispatch({type: "UPDATE_LOGGED_STATE", payload:true})
    }
    if(Trello.token() !== undefined || null !== localStorage.getItem("trello_token")){
    	 Trello.get("members/me/boards?token="+localStorage.getItem("trello_token"))
         .then((boards => {
            dispatch({type: "FETCH_BOARDS", payload: boards});
         })); 
    } 
    
})


export const history = syncHistoryWithStore(browserHistory, store);

if (module.hot) {
    module.hot.accept('./reducers/', () => {
        const nextRootReducer = require('./reducers/index').default;
        store.replaceReducer(nextRootReducer);
    });
}

export default store;