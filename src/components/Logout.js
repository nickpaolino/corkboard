import React from "react";

const Logout = props => {
  props.logoutUser(props.history);
  return <div />;
};

export default Logout;
