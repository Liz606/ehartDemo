import * as cs from '../constants';

const initialState = {
  donut: [
    {name: '', value: 0},
    {name: '', value: 0},
  ],
  table: [],
  limit: 100,
  line: [],
  histogram: [],
};

function format(data) {
  if(!data) {
    return [
      {name: '关键物料', value: 0},
      {name: '紧固物料', value: 0},
    ];
  }

  return [
    {name: '关键物料', value: parseInt(data.jingu)},
    {name: '紧固物料', value: parseInt(data.guanjian)},
  ];
}

export default function materialReducer(state = initialState, action) {
  switch (action.type) {
    case cs.LOGISTICS_DONUT_SUCCESS:
      return Object.assign({}, state, {donut: format(action.payload.records[0])});
    case cs.LOGISTICS_LINE_SUCCESS:
      return Object.assign({}, state, {line: action.payload.records});
    case cs.LOGISTICS_TABLE_SUCCESS:
      return Object.assign({}, state, {table: action.payload.records});
    case cs.LOGISTICS_HISTOGRAM_SUCCESS:
      return Object.assign({}, state, {histogram: action.payload.records[0]});
    case cs.LOGISTICS_PIE_SUCCESS:
      return Object.assign({}, state, {pie: action.payload.records});

    default:
      return state;
  }
}
