import React, { PureComponent, PropTypes } from 'react';

export default class Logo extends PureComponent {
  render() {
    return (
      <div  className="component-logo">
        <img className="component-logo-image" src="assets/images/train_logo.jpg" />
      </div>
    );
  }
}
