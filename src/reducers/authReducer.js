const initialState = {
  currentUser: {},
  loggedIn: false,
  doneFetching: false
};

const authReducer = (state = initialState, action) => {
  console.log("Setting current user in reducer");
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...this.state,
        currentUser: {
          id: action.user.id,
          username: action.user.username
        },
        loggedIn: true,
        doneFetching: true
      };
    default:
      return state;
  }
};

export default authReducer;
