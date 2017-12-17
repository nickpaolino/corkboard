import { api } from "../services/api";

export const signInUser = (userInfo, history) => {
  return dispatch => {
    api.auth.login(userInfo).then(user => {
      if (!user.error) {
        // Sets local storage with jwt token
        localStorage.setItem("token", user.jwt);
        // Dispatches update to state with the current user
        dispatch({ type: "SET_CURRENT_USER", user });
        // Redirect the user to their home page
        history.push("/");
      }
    });
  };
};

export const getCurrentUser = token => {
  return dispatch => {
    api.auth.getUser(token).then(user => {
      if (!user.message) {
        // Dispatches update to state with the current user
        dispatch({ type: "SET_CURRENT_USER", user });
      }
    });
  };
};

export const createUser = (userInfo, history) => {
  return dispatch => {
    api.auth.createUser(userInfo).then(user => {
      if (!user.error) {
        // Sets local storage with jwt token
        localStorage.setItem("token", user.jwt);
        // Dispatches update to state with the current user
        dispatch({ type: "SET_CURRENT_USER", user });
        history.push("/");
      }
    });
  };
};

export const logoutUser = history => {
  localStorage.removeItem("token");
  history.push("/login");
  return { type: "LOGOUT_USER" };
};
