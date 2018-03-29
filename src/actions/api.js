import {CALL_API} from '../middlewares/callAPI';

function format(dataset) {
  return dataset.toUpperCase().replace(/-/g, '_');
}

export function fetch(dataset, params, suffix) {
  const fds = format(dataset);
  const paramsArr = [];

  if(params) {
    for(const i in params) {
      if((typeof params[i] !== 'undefined') && params[i] !== '') {
        paramsArr.push(`${i}=${params[i]}`);
      }
    }
  }

  const paramsString = paramsArr.length > 0 ? `&${paramsArr.join('&')}` : '';

  return {
    [CALL_API]: {
      endpoint: `/api/bdp/datalake/v1/query?dataViewName=${dataset}${paramsString}`,
      method: 'GET',
      types: [
        `${suffix ? format(suffix) : fds}_REQUEST`,
        `${suffix ? format(suffix) : fds}_SUCCESS`,
        `${suffix ? format(suffix) : fds}_FAIL`,
      ],
    },
  };
}
