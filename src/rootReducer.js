import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer.js";
import boardReducer from "./reducers/boardReducer.js";

const rootReducer = combineReducers({
  auth: authReducer,
  board: boardReducer
});

export default rootReducer;
