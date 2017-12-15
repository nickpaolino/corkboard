import React, { Component } from "react";
import { connect } from "react-redux";
import withAuth from "../components/hocs/withAuth";

class ProfileContainer extends Component {
  render() {
    return <div />;
  }
}

const mapStateToProps = state => {
  return {
    auth: {
      user: state.auth.currentUser
    }
  };
};

export default withAuth(connect(mapStateToProps)(ProfileContainer));
