import {CALL_API} from '../middlewares/callAPI';

function format(dataset) {
  return dataset.toUpperCase().replace(/-/g, '_');
}

export default function fetch(dataset, params) {
  const fds = format(dataset);
  const paramsArr = [];

  if(params) {
    for(const i in params) {
      paramsArr.push(`${i}=${params[i]}`);
    }
  }

  const paramsString = paramsArr.length > 0 ? `&${paramsArr.join('&')}` : '';

  return {
    [CALL_API]: {
      endpoint: `/api/bdp/datalake/v1/query?dataSetName=${dataset}${paramsString}`,
      method: 'GET',
      types: [
        `${fds}_REQUESET`,
        `${fds}_SUCCESS`,
        `${fds}_FAIL`,
      ],
    },
  };
}
