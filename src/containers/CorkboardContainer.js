import React, { Component } from "react";
import { connect } from "react-redux";

class CorkboardContainer extends Component {
  componentDidMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/login");
    }
  }

  render() {
    return <div />;
  }
}

export default CorkboardContainer;
