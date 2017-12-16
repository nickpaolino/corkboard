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

// Segment this out into another file eventually
export const fetchBoards = userInfo => {
  return dispatch => {
    const token = localStorage.getItem("token");
    api.boards.fetchBoards(token, userInfo.id).then(user => {
      console.log(user);
      // call to services/formatData to reformat data
      // dispatch({ type: "SET_USER_BOARDS", user });
    });
  };
};

// Data should be reformatted as this
// [
//   {
//     id: 1,
//     subject: "Bitcoin",
//     public: true,
//     admin: false
//   },
//   {
//     id: 2,
//     subject: "Renaissance Art",
//     public: true,
//     admin: true
//   }
// ];
