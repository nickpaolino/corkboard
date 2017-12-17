import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer.js";
import boardReducer from "./reducers/boardReducer.js";

const appReducer = combineReducers({
  auth: authReducer,
  board: boardReducer
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_USER") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
