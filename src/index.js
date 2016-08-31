import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import configStore from './common/configStore';
import routeConfig from './common/routeConfig';


injectTapEventPlugin();
const store = configStore();
const history = syncHistoryWithStore(browserHistory, store);

const root = document.createElement('div');
document.body.appendChild(root);

render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={history} routes={routeConfig} />
    </Provider>
  </MuiThemeProvider>,
  root
);
