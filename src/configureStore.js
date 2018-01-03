import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import reduxThunk from "redux-thunk";

// Creates the store with the rootReducer and applies the Thunk middleware
const configureStore = () => {
  // reduxThunk is used to send async dispatches to the reducers
  return createStore(rootReducer, applyMiddleware(reduxThunk));
};

export default configureStore;
