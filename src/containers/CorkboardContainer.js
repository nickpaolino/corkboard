import React, { Component } from "react";
import { connect } from "react-redux";
import withAuth from "../components/withAuth";

class CorkboardContainer extends Component {
  render() {
    return <div>In CorkboardContainer</div>;
  }
}

export default withAuth(CorkboardContainer);
