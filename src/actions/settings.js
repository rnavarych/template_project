import { SET_LAYOUT } from "../constants/actionTypes";


export function setDirection(bool){
    return {
        type: SET_LAYOUT,
        payload: bool
    }
}

