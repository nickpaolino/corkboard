import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/boards";
import Chatroom from "../components/board/Chatroom";

class BoardDisplayContainer extends Component {
  componentDidMount() {
    this.props.getBoard(this.props.boardId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.boardId !== this.props.boardId) {
      this.props.getBoard(nextProps.boardId);
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.boardId === nextProps.boardId;
  }

  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.board.subject}
        {this.props.board.id ? (
          <Chatroom boardId={this.props.board.id} user={this.props.user} />
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
