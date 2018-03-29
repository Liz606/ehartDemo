const IndexPage = require('../containers/index').default;
const Layout = require('../containers/layout').default;
const Scatter = require('../containers/scatter').default;
const Bar = require('../containers/bar').default;
const Line = require('../containers/line').default;
const NotFoundPage = require('../containers/noPage').default;

export default [
  {
    path: '/',
    getComponent(nextState, callback) {
      callback(null, IndexPage);
    }
  },
  {
    path: '/main',
    getComponent(nextState, callback) {
      callback(null, Layout);
    },
    indexRoute: {
      getComponent(nextState, callback) {
        callback(null, Line);
      }
    },
    childRoutes: [
      {
        path: '/bar',
        getComponent(nextState, callback) {
          callback(null, Bar);
        }
      }, {
        path: '/scatter',
        getComponent(nextState, callback) {
          callback(null, Scatter);
        }
      }, {
        path: '/line',
        getComponent(nextState, callback) {
          callback(null, Line);
        }
      }
    ]
  },
  {
    path: '*',
    getComponent(nextState, callback) {
      callback(null, NotFoundPage);
    }
  },
];
