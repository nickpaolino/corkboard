const initialState = {
  currentBoard: {}
};

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CURRENT_BOARD":
      return {
        ...state,
        currentBoard: action.board
      };
    default:
      return state;
  }
};

export default boardReducer;
