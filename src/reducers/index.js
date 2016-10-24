import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import trello from './trello';

const rootReducer = combineReducers({trello, routing: routerReducer });

export default rootReducer;
