const initialState = {
  currentUser: {},
  loggedIn: false,
  isFetching: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Tells App not to render the navbar until the fetching is done
    case "ASYNC_START":
      return {
        ...state,
        isFetching: true
      };
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: {
          id: action.user.id,
          username: action.user.username,
          boards: action.user.boards,
          subjects: action.user.subjects
        },
        loggedIn: true,
        isFetching: false
      };
    case "LOGOUT_USER":
      return {
        ...state,
        currentUser: {},
        loggedIn: false
      };
    default:
      return state;
  }
};

export default authReducer;
