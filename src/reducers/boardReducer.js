const initialState = {
  currentBoard: {},
  notes: []
};

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CURRENT_BOARD":
      return {
        ...state,
        currentBoard: action.board
      };
    case "SET_CURRENT_NOTE":
      let notes = [...state.notes, action.medium];
      return {
        ...state,
        notes
      };
    case "FETCH_NOTES":
      return {
        ...state,
        notes: action.media
      };
    case "UPDATE_CURRENT_NOTE":
      return {
        ...state,
        notes: state.notes
      };
    case "UPDATE_NOTES":
      const filteredMedia = state.notes.filter(
        note => note.id !== action.media.id
      );
      const deletedNotes = [...state.deletedNotes, action.media];
      return {
        ...state,
        notes: filteredMedia
      };
    default:
      return state;
  }
};

export default boardReducer;
