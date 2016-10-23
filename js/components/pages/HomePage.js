import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import LoginPage from './LoginPage';
class HomePage extends Component {
    render() {
        const {loggedIn} = this.props.data;
        return (
            <article>
                <div>
                    <section className="text-section">
                        {loggedIn ? (
                            <h1>Welcome to Login Flow, you are logged in!</h1>
                        ) : (
                            <LoginPage />
                        )}
                        {/*loggedIn ? (
                            <Link to="/dashboard" className="btn btn--dash">Dashboard</Link>
                        ) : (
                            <div>
                                <LoginPage />
                            </div>
                        )*/}
                    </section>
                </div>
            </article>
        );
    }
}
function select(state) {
    return {
        data: state
    };
}
export default connect(select)(HomePage);
