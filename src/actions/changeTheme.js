import * as types from '../constants/actionTypes';

export const changeTheme = (data = {}) => ({
  type: types.CHANGE_THEME,
  payload: data,
});
