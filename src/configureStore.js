import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import reduxThunk from "redux-thunk";

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(reduxThunk));
};

export default configureStore;
