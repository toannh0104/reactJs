import React from 'react';
import { Link } from 'react-router';
import { doLogin, updateLogged } from '../actions/actionCreators'

const Login = React.createClass({

	doLogin(){
		doLogin(false);
	},

  render() {
  	console.log("Login Render")
    return (      
		<div id="loggedout">
		    <a onClick={this.doLogin} href="#" >Login To Trello</a>
		</div>
    )
  }
});

export default Login;
