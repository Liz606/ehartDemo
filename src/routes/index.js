import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';

import Layout from '../containers/layout';
import DemoException from '../containers/demo-exception';
import DemoMaterial from '../containers/demo-material';

// 路由配置模块
export default(
  <Router>
    <Route path="/" component={Layout}>
      <IndexRoute component={DemoException} />

      <Route path="/exception" component={DemoException} />
      <Route path="/material" component={DemoMaterial} />
    </Route>
  </Router>
);
