const BarDelayAnimation = require('../containers/bar/delay-animation').default;
const StackedHistogram = require('../containers/bar/stacked-histogram').default;


export default {
  indexRoute: {
    getComponent(nextState, callback) {
      callback(null, BarDelayAnimation);
    }
  },
  childRoutes: [{
    path: '/delay-animation',
    getComponent(nextState, callback) {
      callback(null, BarDelayAnimation);
    },
  }, {
    path: '/stacked-histogram',
    getComponent(nextState, callback) {
      callback(null, StackedHistogram);
    }
  }]
};
