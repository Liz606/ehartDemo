import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';

import Home from '../containers/home';
import Layout from '../containers/layout';

export default(
  <Router>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home} />
    </Route>
  </Router>
);
