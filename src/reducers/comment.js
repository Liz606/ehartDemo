import {
  GET_COMMEENTS_REQUEST,
  GET_COMMEENTS_SUCCESS,
  GET_COMMEENTS_FAIL,
} from '../constants';

const initialState = {
  inFetching: false,
  list: [],
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMEENTS_REQUEST:
      return Object.assign({}, state, {inFetching: true});
    case GET_COMMEENTS_SUCCESS:
      return Object.assign({}, state, {
        list: action.payload.comments,
        isFetching: false,
      });
    case GET_COMMEENTS_FAIL:
      return Object.assign({}, state, {inFetching: false});
    default:
      return state;
  }
};

export default commentReducer;
