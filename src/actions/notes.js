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
    return api.media.updateMedia(medium).then(medium => {
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

export const deleteNote = id => {
  return dispatch => {
    api.media.deleteMedia(id).then(media => {
      // dispatch({ type: "UPDATE_NOTES", media });
    });
  };
};
