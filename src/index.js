import React from 'react';

import { render } from 'react-dom';

// Import Components
import App from './components/App';
import Dashboard from './components/Dashboard';

// import react router deps
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

const router = (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Dashboard}></IndexRoute>
        </Route>
      </Router>
    </Provider>
)

render(router, document.getElementById("root"));