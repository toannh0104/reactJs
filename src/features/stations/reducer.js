import {
  STATIONS_TEST_ACTION,
  FETCH_INIT_BEGIN,
  FETCH_INIT_SUCCESS,
  FETCH_INIT_FAILURE,
  FETCH_INIT_DISSMISS_ERROR,

  FETCH_SEARCH_RESULT_BEGIN,
  FETCH_SEARCH_RESULT_SUCCESS,
  FETCH_SEARCH_RESULT_FAILURE,
  FETCH_SEARCH_RESULT_DISMISS_ERROR
} from './constants';

const initialState = {
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    // fetch initial date
    case FETCH_INIT_BEGIN:
        return {
            ...state,
            fetchInitialPending: true
        };

    case FETCH_INIT_SUCCESS:
        return {
            ...state,
            fetchInitialPending: false,
            initialData: action.data
        };
    
    case FETCH_INIT_FAILURE:
        return {
            ...state,
            fetchInitialPending: false,
            fetchInitialDataError: action.data.error
        };

    case FETCH_SEARCH_RESULT_DISMISS_ERROR:
        return {
            ...state,
            fetchInitialDataError: null
        };
    

    // fetch search data
    case FETCH_SEARCH_RESULT_BEGIN:
        return {
            ...state,
            fetchSearchResultPending: true
        };
    
    case FETCH_SEARCH_RESULT_SUCCESS:
        return {
            ...state,
            fetchSearchResultPending: false,
            searchResultData: action.data
        };
    
    case FETCH_SEARCH_RESULT_FAILURE:
        return {
            ...state,
            fetchSearchResultPending: false,
            searchResultError: action.data.error
        };

    case FETCH_SEARCH_RESULT_DISMISS_ERROR:
        return {
            ...state,
            searchResultError: null
        };

    case STATIONS_TEST_ACTION:
      return {
        ...state
      };

    default:
      return state;
  }
}

