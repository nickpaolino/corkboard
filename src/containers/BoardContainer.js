import React, { Component } from "react";
import withAuth from "../components/hocs/withAuth";
import { Route, Switch } from "react-router-dom";
import CreateBoardContainer from "./CreateBoardContainer";
import BoardDisplayContainer from "./BoardDisplayContainer";

class BoardContainer extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/boards/new" component={CreateBoardContainer} />
          <Route
            path="/boards/:id"
            render={props => {
              return <BoardDisplayContainer boardId={props.match.params.id} />;
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default withAuth(BoardContainer);
