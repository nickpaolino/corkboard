import React, { Component } from "react";
import { connect } from "react-redux";
import withAuth from "../components/withAuth";
import * as actions from "../actions/auth";

class ProfileContainer extends Component {
  render() {
    return (
      <div>
        Hi, {this.props.auth.user.username}
        <div>
          <a onClick={this.props.logoutUser}>Logout</a>
        </div>
      </div>
    );
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
