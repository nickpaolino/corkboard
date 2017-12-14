import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer.js";

const rootReducer = combineReducers({
  firstKey: null
});

export default rootReducer;
