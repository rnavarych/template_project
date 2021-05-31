import * as types from '../constants/actionTypes';

let initialState = {
  fetchingLogin: false,

  username: null,
  password: null,

  errorCode: null,
  errorMessage: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST: {
      return {
        ...state,
        fetchingLogin: true,
        errorCode: null,
      };
    }
    case types.LOGIN_SUCCESS: {
      return {
        ...state,
        fetchingLogin: false,
        username: action.username,
        password: action.password,
      };
    }
    case types.LOGIN_FAILURE: {
      return {
        ...state,
        fetchingLogin: false,
        errorCode: action.errorCode,
      };
    }

    case types.LOGOUT:
      return {
        ...state,
        username: null,
        password: null,
        errorCode: null,
        errorMessage: null,
      };

    case types.CLEAR_ERROR:
      return {
        ...state,
        errorCode: null,
      };

    case types.SET_USERNAME:
      return {...state, username: action.payload};

    default:
      return state;
  }
};
export default auth;
