import * as cs from '../constants';

const initialState = {
  donut: {},
  line: {},
  histogram: {},
  inTableFetching: false,
  table: [],
  limit: 10,
};

export default function materialReducer(state = initialState, action) {
  switch (action.type) {
    case cs.MATERIAL_DONUT_SUCCESS:
      return Object.assign({}, state, {donut: action.payload});
    case cs.MATERIAL_LINE_SUCCESS:
      return Object.assign({}, state, {line: action.payload});
    case cs.MATERIAL_HISTOGRAM_SUCCESS:
      return Object.assign({}, state, {histogram: action.payload});

    case cs.MATERIAL_TABLE_REQUEST:
      return Object.assign({}, state, {inTableFetching: true});
    case cs.MATERIAL_TABLE_SUCCESS:
      return Object.assign({}, state, {
        inTableFetching: false,
        table: action.payload.records,
      });
    case cs.MATERIAL_TABLE_FAIL:
      return Object.assign({}, state, {inTableFetching: false});

    default:
      return state;
  }
}
