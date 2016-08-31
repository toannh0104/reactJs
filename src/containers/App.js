import React, { Component, PropTypes } from 'react';
import routeConfig from '../common/routeConfig';
import { Logo } from '../components';
export default class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <div className="app">
        <Logo/>
        <div className="page-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
