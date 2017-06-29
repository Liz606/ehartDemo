import {CALL_API} from '../middlewares/callAPI';

function format(dataset) {
  return dataset.toUpperCase().replace(/-/g, '_');
}

export function refactorChartData(chartData) {
  const data = [];
  let total = 0;

  for(const p in chartData) {
    data.push({
      name: p,
      value: chartData[p],
    });
    total += chartData[p];
  }

  return {data, total};
}

/**
 * action: fetch方法，调用API
 */
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
