import { combineReducers } from "redux";

import BibleReducer from "./BibleReducer";
import BibleStyle from "./BibleStyle"

export default combineReducers({
	bible: BibleReducer,
	style: BibleStyle
})