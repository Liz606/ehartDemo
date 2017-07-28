// 路由配置模块
export default {
  path: '/',
  getComponent(nextState, callback) {
    require.ensure([], require => {
      callback(null, require('../containers/layout').default);
    }, 'main');
  },
  indexRoute: {
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, require('../containers/demo-exception').default);
      }, 'exception');
    }
  },
  childRoutes: [{
    path: 'exception',
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, require('../containers/demo-exception').default);
      }, 'exception');
    }
  }, {
    path: 'material',
    getComponent(nextState, callback) {
      require.ensure([], require => {
        callback(null, require('../containers/demo-material').default);
      }, 'material');
    }
  }]
};
