import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer.js";

const rootReducer = combineReducers({
  auth: authReducer
});

export default rootReducer;
