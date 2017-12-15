import React, { Component } from "react";
import withAuth from "../components/hocs/withAuth";

class BoardContainer extends Component {
  render() {
    return <div>BOARD CONTAINER</div>;
  }
}

export default withAuth(BoardContainer);
