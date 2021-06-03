import * as types from '../constants/actionTypes';

export const addToFavourites = data => ({
  type: types.ADD_TO_FAVOURITES,
  payload: data,
});

export const deleteFavourites = key => ({
  type: types.DELETE_FAVOURITES,
  key: key,
});
