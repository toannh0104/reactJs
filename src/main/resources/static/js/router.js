import React from 'react';
import {Router, Route, browserHistory, IndexRoute, useRouterHistory } from 'react-router';
import { createHistory, useBeforeUnload } from 'history'

// Layouts
import MainLayout from './components/main-layout';
// import MainLayout from './components/layouts/Dashboard';
import SearchLayout from './components/search-layout';

// Pages
import Dashboard from './components/dashboard';
import UserList from './components/user-list';
import UserProfile from './components/user-profile';
import Observations from './components/observation-record';
import UserRole from './components/user-role';

const history = useRouterHistory(useBeforeUnload(createHistory))()

// history.listenBeforeUnload(function () {
//   return 'Are you sure you want to leave this page?'
// })

export default (
    <Router history={browserHistory} >
      <Route component={MainLayout}>
        <Route path="/" component={Dashboard}/>

        <Route path="users">
          <Route component={SearchLayout}>
            <IndexRoute component={UserList}/>
          </Route>
          <Route path=":userId" component={UserProfile}/>
        </Route>

        <Route path="observations">
          <Route component={SearchLayout}>
            <IndexRoute component={Observations}/>
          </Route>
        </Route>

        <Route path="roles">
          <Route component={SearchLayout}>
            <IndexRoute component={UserRole}/>
          </Route>
        </Route>

      </Route>
    </Router>
);
