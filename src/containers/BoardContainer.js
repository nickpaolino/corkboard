import React, { Component } from "react";
import withAuth from "../components/hocs/withAuth";
import { Route, Switch } from "react-router-dom";
import CreateBoardContainer from "./CreateBoardContainer";
import BoardDisplayContainer from "./BoardDisplayContainer";
import { connect } from "react-redux";

class BoardContainer extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/boards/new" component={CreateBoardContainer} />
          <Route
            path="/boards/:id"
            render={props => {
              return (
                <BoardDisplayContainer
                  {...props}
                  boardId={props.match.params.id}
                />
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    board: state.board.currentBoard,
    user: state.auth.currentUser
  };
};

export default withAuth(connect(mapStateToProps)(BoardContainer));
