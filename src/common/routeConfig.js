import App from '../containers/App';

import { Page404 } from '../components';
import stationsRoute from '../features/stations/route';

export default [{
  path: '/',
  component: App,
  indexRoute: stationsRoute.siteIndexRoute,
  childRoutes: [
    stationsRoute,
    { path: '*', name: '404', component: Page404 },
  ],
}];