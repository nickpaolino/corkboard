import { api } from "../services/api";

export const getBoard = (id, history) => {
  const token = localStorage.getItem("token");
  return dispatch => {
    api.boards.getBoard(id, token).then(board => {
      dispatch({ type: "GET_CURRENT_BOARD", board });
      if (history) history.push(`/boards/${id}`);
    });
  };
};

export const createBoard = board => {
  const token = localStorage.getItem("token");
  return dispatch => {
    api.boards.createBoard(board, token).then(board => {
      console.log(board);
      // dispatch({ type: "GET_CURRENT_BOARD", board });
    });
  };
};
