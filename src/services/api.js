import {BASE_URL} from '../configs';
import {
  REQUEST_TIMEOUT,
  ERROR_CODE_UNKNOWN,
  ERROR_CODE_BAD_CONNECTION,
} from '../configs';

async function getFetchAction({endpoint, method, token, body, headers}) {
  const request = {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    request.body = JSON.stringify(body);
  }

  return fetch(`${BASE_URL}${endpoint}`, request);
}

const timeoutAction = reject =>
  setTimeout(() => reject(new Error('Request timed out.')), REQUEST_TIMEOUT);

export function callApi({endpoint, method, token, body, headers}) {
  return Promise.race([
    getFetchAction({endpoint, method, token, body, headers}),
    new Promise((resolve, reject) => timeoutAction(reject)),
  ])
    .then(response => {
      return response.json().then(json => {
        return {json, response};
      });
    })
    .then(({json, response}) => {
      if (!response.ok || !json) {
        const error = {
          code: response.status,
          message: json?.error?.message,
        };
        // json.code = response.status;
        return Promise.reject(error);
      }
      return json;
    });
}

export const apiMiddleware = store => next => action => {
  let {endpoint} = action;
  const {types, method, body, extras, headers} = action;

  if (
    (!endpoint && !method && !types && action.type) ||
    typeof action === 'function'
  ) {
    return next(action);
  }

  const state = store.getState();

  if (typeof endpoint === 'function') {
    endpoint = endpoint(state);
  }

  if (!method) {
    throw new Error('method is not exist');
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const [requestType, successType, failureType] = types;

  next(Object.assign({}, {type: requestType, extras}));

  const token = store.getState().auth.token;

  return callApi({endpoint, method, token, body, headers}).then(
    response => {
      const result = response;
      next(Object.assign({}, {type: successType, result, extras}));
      return result;
    },
    error => {
      let errorCode = ERROR_CODE_UNKNOWN;
      if (error.code) {
        // bad server responses should always contain 'code' property;
        errorCode = error.code;
      } else {
        // no internet connection & request timeout errors will not contain any code,
        // because they are handled locally;
        errorCode = ERROR_CODE_BAD_CONNECTION;
      }
      const errorMessage = error.message || 'Something bad happened';

      next(
        Object.assign(
          {},
          {
            type: failureType,
            extras,
            errorCode,
            errorMessage,
          },
        ),
      );
    },
  );
};
