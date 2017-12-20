export const createNote = note => {
  console.log("HERE");
  return dispatch => {
    console.log(note);
    dispatch({ type: "SET_CURRENT_NOTE", note });
  };
};
