import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/boards";

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
    return <div>{this.props.board.subject}</div>;
  }
}

const mapStateToProps = state => {
  return {
    board: state.board.currentBoard
  };
};

export default connect(mapStateToProps, actions)(BoardDisplayContainer);
