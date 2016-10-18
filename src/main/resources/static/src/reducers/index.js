import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import posts from './posts';
import comments from './comments';
// import photos from './photos';

const rootReducer = combineReducers({posts, comments, routing: routerReducer });

export default rootReducer;
