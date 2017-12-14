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

export const logoutUser = () => {
  localStorage.removeItem("token");
  return { type: "LOGOUT_USER" };
};
