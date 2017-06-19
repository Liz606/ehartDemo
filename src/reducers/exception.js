import * as cs from '../constants';

const initialState = {
  table: [],
  limit: 100,
  histogram: [],
  pie: [],
};

export default function exceptionReducer(state = initialState, action) {
  switch (action.type) {
    case cs.EXCEPTION_TABLE_SUCCESS:
      return Object.assign({}, state, {table: action.payload.records});
    case cs.EXCEPTION_HISTOGRAM_SUCCESS:
      return Object.assign({}, state, {histogram: action.payload.records});
    case cs.EXCEPTION_PIE_SUCCESS:
      return Object.assign({}, state, {pie: action.payload.records});

    default:
      return state;
  }
}
