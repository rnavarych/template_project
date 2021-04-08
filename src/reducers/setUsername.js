import * as types from '../constants/actionTypes';

const initState = {
  username: '',
};

const setUsernameReducer = (state = initState, action) => {
  switch (action.type) {
    case types.SET_USERNAME:
      return {...state, username: action.payload};
    default:
      return state;
  }
};
export default setUsernameReducer;
