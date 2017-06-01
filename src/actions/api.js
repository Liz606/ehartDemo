import {CALL_API} from '../middlewares/callAPI';
import {
  GET_COMMEENTS_REQUEST,
  GET_COMMEENTS_SUCCESS,
  GET_COMMEENTS_FAIL,
} from '../constants';

export default function getComments() {
  return {
    [CALL_API]: {
      endpoint: '/comment/tag_54',
      method: 'GET',
      types: [GET_COMMEENTS_REQUEST, GET_COMMEENTS_SUCCESS, GET_COMMEENTS_FAIL]
    },
  };
}
