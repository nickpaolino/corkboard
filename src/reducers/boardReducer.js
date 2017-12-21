const initialState = {
  currentBoard: {},
  notes: [],
  currentNote: {},
  noteCreated: false
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
        noteCreated: true
      };
    default:
      return state;
  }
};

export default boardReducer;
