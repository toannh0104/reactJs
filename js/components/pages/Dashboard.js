import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
  render() {
    return (
      <article>
        <section className="text-section">
          <h1>Dashboard</h1>
          <p>Welcome, you are logged in! To have a look at the code behind this application, go to <a href="https://github.com/mxstbr/login-flow">Github</a>. To run it locally:</p>
        </section>
      </article>
    );
  }
}

function select(state) {
  return {
    data: state
  };
}

export default connect(select)(Dashboard);
