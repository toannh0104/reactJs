import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login} from '../../actions/AppActions';

export default class LoginPage extends Component {

    doLogin() {
        console.log("doLogin")
        login();
    }

    render() {
        const dispatch = this.props.dispatch;
        const {formState, currentlySending} = this.props.data;
        return (
            <div className="login">
                <button className="btn btn--login btn--nav" onClick={this.doLogin}>Login to Trello</button>
            </div>
        );
    }

    _login(username, password) {
        this.props.dispatch(login(username, password));
    }
}
function select(state) {
    return {
        data: state
    };
}

export default connect(select)(LoginPage);
