import React, { Component } from "react";
import { connect } from "react-redux";
import withAuth from "../components/withAuth";

class CorkboardContainer extends Component {
  render() {
    return <div>Hi, {this.props.auth.user.username}</div>;
  }
}

export default withAuth(CorkboardContainer);
