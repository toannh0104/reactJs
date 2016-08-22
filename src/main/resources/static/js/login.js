/**
 * Created by Toan_H on 8/16/2016.
 */
'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const when = require('when');
const client = require('../client');
const follow = require('../follow'); // function to hop multiple links by "rel"
const stompClient = require('../websocket-listener');
const root = '/api';
window.ReactDOM = ReactDOM;

class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h2 autoFocus="form-signin-heading">Please sign in</h2>
                <label htmlFor="username" className="sr-only">Email address</label>
                <input id="username" name="username" className="form-control" placeholder="Email address"
                       required="required" autoFocus />
                <label htmlFor="password" className="sr-only">Password</label>
                <input type="password" id="password" name="password" className="form-control" placeholder="Password"
                       required="required"/>
                <div className="checkbox">
                    <label>
                        <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            </div>
        );
    }
}
ReactDOM.render(
    <Login />,
    document.getElementById('login')
)