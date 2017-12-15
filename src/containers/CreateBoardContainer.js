import React, { Component } from "react";
import withAuth from "../components/hocs/withAuth";

class CreateBoardContainer extends Component {
  render() {
    return <div>Create a New Board</div>;
  }
}

export default withAuth(CreateBoardContainer);
