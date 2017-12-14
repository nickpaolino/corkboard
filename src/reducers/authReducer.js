const initialState = {
  currentUser: {},
  loggedIn: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...this.state,
        currentUser: {
          id: action.user.id,
          username: action.user.username
        },
        loggedIn: true
      };
    default:
      return state;
  }
};

export default authReducer;
