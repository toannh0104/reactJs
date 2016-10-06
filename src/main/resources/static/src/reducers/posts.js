import axios from 'axios';
var querystring = require('querystring');

function posts(state = [], action) {
    switch (action.type) {
        case 'FETCH_PHOTOS' :
            console.log("fetch photos !!!");
            return action.payload
            break;
        case 'INCREMENT_LIKES' :
            console.log("Incrementing Likes!!");
            var i = action.index;
            axios.get(action.id)
                .then((response) => {
                    var data = response.data;
                    var _id = data._links.self.href;
                    var postURI = _id.substring(0, _id.lastIndexOf("/"));
                    _id = _id.substr(_id.lastIndexOf("/") + 1, _id.length);
                    var cpost = {
                        title: data.title,
                        likes: state[i].likes + 1,
                        image: data.image,
                        id: _id
                    }
                    axios.post(postURI,
                        JSON.stringify(cpost), {
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                        .then((res) => {
                            console.log(res);
                            if(res.status === 201){
                                state[i].likes = res.data.likes;
                            }else{
                                state[i].likes = res.data._embedded.photos[i].likes;
                            }
                        })
                })
            return [
                ...state.slice(0, i), // before the one we are updating
                {...state[i], likes: state[i].likes + 1},
                ...state.slice(i + 1), // after the one we are updating
            ]
        default:
            return state;
    }
}

export default posts;
