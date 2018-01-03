import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer.js";
import boardReducer from "./reducers/boardReducer.js";

// reducers are divided between managing user auth and board state
const appReducer = combineReducers({
  auth: authReducer,
  board: boardReducer
});

// the root reducer returns the combineReducers with the logout reducer
const rootReducer = (state, action) => {
  // this reducer is responsible for resetting the redux store on logout
  if (action.type === "LOGOUT_USER") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
