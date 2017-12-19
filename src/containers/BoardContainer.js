import React, { Component } from "react";
import withAuth from "../components/hocs/withAuth";
import { Route, Switch, Redirect } from "react-router-dom";
import CreateBoardContainer from "./CreateBoardContainer";
import BoardDisplayContainer from "./BoardDisplayContainer";
import { connect } from "react-redux";

class BoardContainer extends Component {
  boardIncludesUser = currentBoardId => {
    // This checks to see if the user has access to the board
    const boardIds = this.props.user.boards.map(board => board.id);
    const filteredIds = boardIds.filter(id => {
      return parseInt(id) === parseInt(currentBoardId);
    });
    return !!filteredIds.length;
  };
  render() {
    return (
      <div>
        <Switch>
          <Route
            path="/boards/new"
            render={props => {
              return <CreateBoardContainer {...props} />;
            }}
          />
          <Route
            path="/boards/:id"
            render={props => {
              if (this.boardIncludesUser(props.match.params.id)) {
                return (
                  <BoardDisplayContainer
                    {...props}
                    boardId={props.match.params.id}
                  />
                );
              } else {
                return <Redirect to="/" />;
              }
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
