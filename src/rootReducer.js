import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer.js";

const rootReducer = combineReducers({
  firstKey: authReducer
});

export default rootReducer;
