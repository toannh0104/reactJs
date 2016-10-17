import {createStore, compose, applyMiddleware, combineReducers} from 'redux'
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';
import axios from 'axios';
// import the root reducer
import rootReducer from './reducers/index';
import logger from 'redux-logger';
import comments from './data/comments';
import posts from './data/posts';
import thunk from 'redux-thunk';

const middleware = applyMiddleware(thunk, logger());
// create an object for the default data
// const defaultState = {
//     posts,
//     comments
// };

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {}

// const store1 = createStore(rootReducer, defaultState);

//const store = createStore(rootReducer, middleware);
const store = createStore(
    rootReducer,
    persistedState,
    middleware
)

store.dispatch((dispatch) => {    
	axios.get("/api/photos")
		.then((response) => {
			dispatch({type: "FETCH_PHOTOS", payload: response.data._embedded.photos});
		})
})

store.dispatch((dispatch) => {
    axios.get("/api/comments")
        .then((response) => {
            dispatch({type: "FETCH_COMMENTS", payload: response.data._embedded.comments});
        })
})
export const history = syncHistoryWithStore(browserHistory, store);

if (module.hot) {
    module.hot.accept('./reducers/', () => {
        const nextRootReducer = require('./reducers/index').default;
        store.replaceReducer(nextRootReducer);
    });
}

export default store;