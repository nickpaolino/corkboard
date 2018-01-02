import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/boards";
import Chatroom from "../components/board/Chatroom";
import BulletinContainer from "./BulletinContainer";

class BoardDisplayContainer extends Component {
  componentDidMount() {
    if (!this.props.board.id) this.props.getBoard(this.props.boardId);
  }

  render() {
    return (
      <div className="board container">
        {this.props.board.id ? (
          <Chatroom board={this.props.board} user={this.props.user} />
        ) : (
          ""
        )}
        {this.props.board.id ? (
          <BulletinContainer
            board={this.props.board}
            history={this.props.history}
          />
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
