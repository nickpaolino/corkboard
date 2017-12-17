import { api } from "../services/api";

export const getUsers = () => {
  const token = localStorage.getItem("token");
  return dispatch => {
    api.users.getAllUsers(token).then(users => {
      dispatch({ type: "SET_USERS", users });
    });
  };
};
