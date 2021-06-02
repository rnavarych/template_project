import * as types from '../constants/actionTypes';

const initialState = {
  favouritesList: [],
};

const favouritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TO_FAVOURITES:
      return {...state, favouritesList: action.payload};
    case types.DELETE_FAVOURITES:
      return {
        ...state,
        favouritesList: state.favouritesList.filter(
          item => item.uri !== action.key,
        ),
      };
    default:
      return state;
  }
};

export default favouritesReducer;
