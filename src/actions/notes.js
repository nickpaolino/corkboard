import { api } from "../services/api";

export const createNote = medium => {
  return dispatch => {
    api.media.createMedia(medium).then(medium => {
      dispatch({ type: "SET_CURRENT_NOTE", medium });
    });
  };
};

export const updateNote = medium => {
  return dispatch => {
    api.media.updateMedia(medium).then(medium => {
      dispatch({ type: "UPDATE_CURRENT_NOTE", medium });
    });
  };
};

export const fetchNotes = boardId => {
  return dispatch => {
    api.media.fetchMedia(boardId).then(media => {
      dispatch({ type: "FETCH_NOTES", media });
    });
  };
};
