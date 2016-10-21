import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import stationsReducer from '../features/stations/reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  stations: stationsReducer,
});

export default rootReducer;
