const LineGradient = require('../containers/line/gradient').default;
const LineTowValueAxes = require('../containers/line/towvalueaxes').default;


export default {
  indexRoute: {
    getComponent(nextState, callback) {
      callback(null, LineGradient);
    }
  },
  childRoutes: [{
    path: '/gradient',
    getComponent(nextState, callback) {
      callback(null, LineGradient);
    },
  }, {
    path: '/towvalueaxes',
    getComponent(nextState, callback) {
      callback(null, LineTowValueAxes);
    }
  }]
};
