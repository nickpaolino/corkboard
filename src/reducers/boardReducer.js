const initialState = {
  currentBoard: {},
  notes: [],
  currentNote: {},
  deletedNotes: [],
  noteCreated: false,
  noteDeleted: false
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
        currentNote: action.medium,
        notes,
        noteCreated: true,
        noteDeleted: false
      };
    case "FETCH_NOTES":
      return {
        ...state,
        notes: action.media,
        noteDeleted: false
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
        notes: filteredMedia,
        noteDeleted: true
      };
    default:
      return state;
  }
};

export default boardReducer;
