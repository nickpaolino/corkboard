import { createStore } from "redux";
import rootReducer from "./rootReducer";

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
