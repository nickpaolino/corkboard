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

export const getBoard = (id, history) => {
  const token = localStorage.getItem("token");
  return dispatch => {
    api.boards.getBoard(id, token).then(board => {
      dispatch({ type: "GET_CURRENT_BOARD", board });
      if (history) history.push(`/boards/${id}`);
    });
  };
};

export const createBoard = (board, history) => {
  return dispatch => {
    return api.boards.createBoard(board).then(board => {
      dispatch({ type: "GET_CURRENT_BOARD", board });
      history.push(`/boards/${board.id}`);
    });
  };
};

export const getUsers = () => {
  const token = localStorage.getItem("token");
  return dispatch => {
    api.users.getAllUsers(token).then(users => {
      dispatch({ type: "SET_USERS", users });
    });
  };
};

export const getBoards = () => {
  return dispatch => {
    api.users.getBoards().then(user => {
      const boards = user.boards;
      dispatch({ type: "UPDATE_BOARDS", boards });
    });
  };
};
