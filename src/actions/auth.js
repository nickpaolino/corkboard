import { api } from "../services/api";

export const signInUser = userInfo => {
  return dispatch => {
    api.auth.login(userInfo).then(user => {
      if (!user.error) {
        // Sets local storage with jwt token
        localStorage.setItem("token", user.jwt);
        // Dispatches update to state with the current user
        dispatch({ type: "SET_CURRENT_USER", user });
      }
    });
  };
};
