'use strict';

var SockJS = require('sockjs-client'); // <1>
require('stompjs'); // <2>
import store from './src/store';

// function register(registration) {
// 	var socket = SockJS('/payroll'); // <3>
// 	var stompClient = Stomp.over(socket);
// 	stompClient.connect({}, function(frame) {
// 		console.log("Subscribe ws");
// 		// registrations.forEach(function (registration) { // <4>
// 			stompClient.subscribe(registration.route, registration.callback);
// 		// });
// 	});
// }
//
// module.exports = {
// 	register: register
// };
//


var socket = new SockJS('/payroll');
var stompClient = Stomp.over(socket);
stompClient.connect({}, function (frame) {
	stompClient.subscribe('/topic/posts', function (msg) {
		console.log("MSG: "+msg + store)
		store.dispatch((dispatch) => {
			dispatch({type: "SYNC_LIKE", payload: msg});
		})
	});
});

export default stompClient;