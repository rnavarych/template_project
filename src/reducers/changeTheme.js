import * as types from '../constants/actionTypes';

const initState = {
  isDarkTheme: false,
};

const changeThemeReducer = (state = initState, action) => {
  switch (action.type) {
    case types.CHANGE_THEME:
      return {...state, isDarkTheme: action.payload};
    default:
      return state;
  }
};
export default changeThemeReducer;
