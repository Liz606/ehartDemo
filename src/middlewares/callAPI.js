import {normalize} from 'normalizr';

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API');

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default () => next => action => {
  const callAPI = action[CALL_API];
  if(typeof callAPI === 'undefined') {
    return next(action);
  }

  let {endpoint} = callAPI;
  const {types, schema, method = 'GET', body } = callAPI;

  if(!endpoint) {
    throw new Error('Endpoint is missing.');
  }
  if(typeof endpoint === 'string') {
    const options = {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkbiI6ImNuPUdhbyBaaGlsb25nLG91PWRldixkYz1maXJldGFpbG1vbmtleSxkYz10ZWNoIiwiY29udHJvbHMiOltdLCJnaXZlbk5hbWUiOiJHYW8iLCJzbiI6IlpoaWxvbmciLCJjbiI6IkdhbyBaaGlsb25nIiwibWFpbCI6InpoaWxvbmcuZ2FvQG5hbnl1LnRlY2giLCJvYmplY3RDbGFzcyI6WyJpbmV0T3JnUGVyc29uIiwidG9wIl0sIm5hbWUiOiJHYW8gWmhpbG9uZyIsImlhdCI6MTQ5NTg3NDAwMn0.F3mdRzoISt4sktjjriUM_IVZFejPDovtGbstsb1_HjsJUu3wQbMmBW6KvoTIEwHChlGCbVHBub_n7vIlX3e6Ct56uwEcOPItxOozFZQyHxQDcXMdfULRjVENX4IwL26LFy5h1eZ-mvoHmvGQWMSLTNM48TZl6gmmCT8fLSM9WgE'
      },
    };

    if(body) options.body = JSON.stringify(body);
    endpoint = fetch(endpoint, options).then(response =>
      response.json().then(json => {
        if(!response.ok) {
          return Promise.reject(json);
        }

        return json;
      })
    );
  }
  if(!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if(!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  return endpoint
    .then(data => next(actionWith({
      payload: schema ? normalize(data, schema) : data,
      type: successType,
    })))
    .catch(err => next(actionWith({
      type: failureType,
      error: err || {message: 'Something bad happened'},
    })));
};
