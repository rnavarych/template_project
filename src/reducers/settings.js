import * as types from '../constants/actionTypes';

const initalState = {
    isRtl: false,
};

export function settings(state = initalState, action) {
    switch (action.type) {
        case types.SET_LAYOUT:
            return {...state, isRtl: action.payload};
        default:
            return Object.assign({}, state);
    }
}
