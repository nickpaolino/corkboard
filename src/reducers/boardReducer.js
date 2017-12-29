const initialState = {
  currentBoard: {},
  notes: [],
  justFetchedBoard: false
};

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CURRENT_BOARD":
      return {
        ...state,
        currentBoard: action.board,
        notes: action.board.media
      };
    case "SET_CURRENT_NOTE":
      let notes = [...state.notes, action.medium];
      return {
        justFetchedBoard: false,
        ...state,
        notes
      };
    case "FETCH_NOTES":
      return {
        ...state,
        justFetchedBoard: false,
        notes: action.media
      };
    case "UPDATE_CURRENT_NOTE":
      return {
        ...state,
        justFetchedBoard: false,
        notes: state.notes
      };
    case "UPDATE_NOTES":
      const filteredMedia = state.notes.filter(
        note => note.id !== action.media.id
      );
      const deletedNotes = [...state.deletedNotes, action.media];
      return {
        ...state,
        justFetchedBoard: false,
        notes: filteredMedia
      };
    case "JUST_FETCHED_BOARD":
      return {
        ...state,
        justFetchedBoard: true
      };
    default:
      return state;
  }
};

export default boardReducer;
