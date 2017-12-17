const initialState = {
  currentUser: {},
  loggedIn: false,
  users: []
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case "SET_USERS":
      // Sets all users except for the current user
      const users = action.users.filter(
        user => user.id !== state.currentUser.id
      );
      return {
        ...state,
        users: users
      };
    default:
      return state;
  }
};

export default authReducer;
