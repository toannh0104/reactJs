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
	console.log("FETCH_BOARDS");
	 Trello.get("members/me/boards?key="+Trello.key()+"&token="+Trello.token(), function (response) {
         dispatch({type: "FETCH_BOARDS", payload: response});
     });	
})


export const history = syncHistoryWithStore(browserHistory, store);

if (module.hot) {
    module.hot.accept('./reducers/', () => {
        const nextRootReducer = require('./reducers/index').default;
        store.replaceReducer(nextRootReducer);
    });
}

export default store;