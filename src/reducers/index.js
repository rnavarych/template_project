import { combineReducers } from "redux";

import auth from './auth'
import {settings} from './settings'

export const root = combineReducers({
        auth,
        settings
})