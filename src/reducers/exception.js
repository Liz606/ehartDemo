import * as cs from '../constants';

const initialState = {
  inTableFetching: false,
  table: [],
  limit: 50,
  histogram: {},
  pie: {},
};

export default function exceptionReducer(state = initialState, action) {
  switch (action.type) {
    case cs.EXCEPTION_TABLE_REQUEST:
      return Object.assign({}, state, {inTableFetching: true});
    case cs.EXCEPTION_TABLE_SUCCESS:
      return Object.assign({}, state, {
        inTableFetching: false,
        table: action.payload.records,
      });
    case cs.EXCEPTION_TABLE_FAIL:
      return Object.assign({}, state, {inTableFetching: false});

    case cs.EXCEPTION_STACK_SUCCESS:
      return Object.assign({}, state, {histogram: action.payload});
    case cs.EXCEPTION_DONUT_SUCCESS:
      return Object.assign({}, state, {pie: action.payload});

    default:
      return state;
  }
}
