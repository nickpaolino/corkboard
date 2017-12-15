import React, { Component } from "react";
import withAuth from "../components/hocs/withAuth";
import { Route, Switch } from "react-router-dom";
import CreateBoardContainer from "./CreateBoardContainer";

class BoardContainer extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/boards/new" component={CreateBoardContainer} />
        </Switch>
      </div>
    );
  }
}

export default withAuth(BoardContainer);
