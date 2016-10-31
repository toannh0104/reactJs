import React from 'react';
import {Pie} from 'react-chartjs-2';
import Login from './Login';
import Board from './Board';
import {doLogout} from '../actions/actionCreators';
const Dashboard = React.createClass({
 
    doLogout(){        
        doLogout();
        window.location.reload();
        //window.savecurrentdata();        
    },

    render() {
        console.log("Render dashboard");
        var loggedIn = !!this.props.loggin;
        return (
            <div>
                {loggedIn ? (                       
                    <div id="warrper" >
                        <div id="header">
                            <a id="disconnect" href="#" onClick={this.doLogout} className="btn btn-primary" > Log Out</a>
                        </div>
                        <Board {...this.props} />
                    </div>
                     ): (<Login />)}          
            </div>
        );
    }
});

export default Dashboard;
