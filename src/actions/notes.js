import { api } from "../services/api";

export const createNote = medium => {
  return dispatch => {
    api.media.createMedia(medium).then(medium => {
      dispatch({ type: "SET_CURRENT_NOTE", medium });
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

export const updateNote = (medium, userId) => {
  return dispatch => {
    if (medium.isBoard) {
      const body = {
        user_id: userId,
        board_id: medium.id,
        left_position: medium.left_position,
        top_position: medium.top_position
      };
      api.boards.createBoardPositions(null, body);
      // Make patch request to board_user here to update position of board on user home page
    } else {
      return api.media.updateMedia(medium).then(medium => {
        dispatch({ type: "UPDATE_CURRENT_NOTE", medium });
      });
    }
  };
};

export const fetchNotes = boardId => {
  return dispatch => {
    return api.media.fetchMedia(boardId).then(media => {
      dispatch({ type: "FETCH_NOTES", media });
    });
  };
};

export const deleteNote = id => {
  return dispatch => {
    api.media.deleteMedia(id).then(media => {
      // dispatch({ type: "UPDATE_NOTES", media });
    });
  };
};

export const justFetchedBoard = () => {
  return dispatch => {
    dispatch({ type: "JUST_FETCHED_BOARD" });
  };
};

export const addUsersToBoard = (boardId, users) => {
  return dispatch => {
    return api.boards.addUsers(boardId, users).then(board => {
      dispatch({ type: "GET_CURRENT_BOARD", board });
    });
  };
};

export const deleteBoard = (id, history) => {
  return dispatch => {
    api.boards.deleteBoard(id).then(board => {
      if (history) history.push(`/`);
    });
  };
};
