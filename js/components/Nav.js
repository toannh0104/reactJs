/**
 *
 * Nav.react.js
 *
 * This component renders the navigation bar
 *
 */

import React, { Component } from 'react';
import { Link } from 'react-router';
import { logout } from '../actions/AppActions';

class Nav extends Component {
  render() {
    const navButtons = this.props.loggedIn ? (
        <div>
          <Link to="/dashboard" className="btn btn--dash btn--nav">Dashboard</Link>
          {this.props.currentlySending ? (
            <div className="btn--nav" />
          ) : (
            <a href="#" className="btn btn--login btn--nav" onClick={::this._logout}>Logout</a>
          )}
        </div>
      ) : (
        <div>
          <Link to="/" className="btn btn--login btn-logged-nav">Hi Guest! </Link>
        </div>
      );

    return(
      <div className="nav">
        <div className="nav__wrapper">
          <Link to="/" className="nav__logo-wrapper"><h1 className="nav__logo">Welcome Recruitment </h1></Link>
          { navButtons }
        </div>
      </div>
    );
  }

  _logout() {
    this.props.dispatch(logout());
  }
}

Nav.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
  currentlySending: React.PropTypes.bool.isRequired
}

export default Nav;
