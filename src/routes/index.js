
import Line from './line';
import Bar from './bar';

const IndexPage = require('../containers/index').default;
const Layout = require('../containers/layout').default;
const LineGradient = require('../containers/line/gradient').default;
const NotFoundPage = require('../containers/noPage').default;

export default [
  {
    path: '/main',
    getComponent(nextState, callback) {
      callback(null, IndexPage);
    }
  },
  {
    path: '/',
    getComponent(nextState, callback) {
      callback(null, Layout);
    },
    indexRoute: {
      getComponent(nextState, callback) {
        callback(null, LineGradient);
      }
    },
    childRoutes: [
      Line,
      Bar
    ]
  },
  {
    path: '*',
    getComponent(nextState, callback) {
      callback(null, NotFoundPage);
    }
  },
];
