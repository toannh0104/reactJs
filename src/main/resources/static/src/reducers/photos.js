/**
 * Created by Toan_H on 10/5/2016.
 */
const initialState = {
	fetching: false,
	fetched: false,
	photos: [],
	error: null
}

function photos(state = initialState, action) {
    switch(action.type) {
        case 'FETCH_PHOTOS' :
            console.log("fetch photos !!!");
			return{...state, photos: action.payload}
			break;
        default:
            return state;
    }
}

export default photos;