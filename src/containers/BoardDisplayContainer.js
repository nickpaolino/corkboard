import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/boards";
import Chatroom from "../components/board/Chatroom";

class BoardDisplayContainer extends Component {
  componentDidMount() {
    if (!this.props.board.id) this.props.getBoard(this.props.boardId);
  }

  render() {
    return (
      <div>
        {parseInt(this.props.board.id) === parseInt(this.props.boardId) ? (
          <Chatroom board={this.props.board} user={this.props.user} />
        ) : (
          ""
        )}
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

export default connect(mapStateToProps, actions)(BoardDisplayContainer);
