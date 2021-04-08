import * as types from '../constants/actionTypes';

export const setUsername = (data: {}) => ({
  type: types.SET_USERNAME,
  payload: data,
});
