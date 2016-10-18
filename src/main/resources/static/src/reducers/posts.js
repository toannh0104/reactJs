import axios from 'axios';

function updateState(message) {
    console.log("Update state: " + message);
}
function posts(state = [], action) {
    switch (action.type) {
        case 'SYNC_LIKE' :
            var syncId = JSON.parse(action.payload.body).id;
            var syncLike = JSON.parse(action.payload.body).likes;
            var i = JSON.parse(action.payload.body).index;
            return [
                ...state.slice(0, i), // before the one we are updating
                {...state[i], likes: (syncLike === state[i].likes) ? state[i].likes : state[i].likes + 1},
                ...state.slice(i + 1), // after the one we are updating
            ]
            break;
        case 'FETCH_PHOTOS' :
            console.log("fetch photos !!!");
            return action.payload
            break;
        case 'INCREMENT_LIKES' :
            console.log("Incrementing Likes!!");
            var i = action.index;
            var _objURI = action.id;
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
                            if (res.status === 201) {
                                state[i].likes = res.data.likes;
                                var _id = res.data._links.self.href;
                                _id = _id.substr(_id.lastIndexOf("/") + 1, _id.length);
                            } else {
                                state[i].likes = res.data._embedded.photos[i].likes;
                            }
                        })
                })
                .catch(function (error) {
                    console.log('Error when increasing like: ', error);
                    var likeQueues = localStorage.getItem("like_queue");
                    if (likeQueues === null) {
                        likeQueues = [];
                    } else {
                        likeQueues = JSON.parse(likeQueues);
                    }
                    var like_queue_item = {
                        id: _objURI,
                        type: 'INCREMENT_LIKES'
                    }
                    likeQueues.push(like_queue_item);
                    localStorage.setItem("like_queue", JSON.stringify(likeQueues));
                });
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
