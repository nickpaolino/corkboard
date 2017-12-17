import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/boards";

class BoardDisplayContainer extends Component {
  componentDidMount() {
    console.log("Component Did Mount", this.props);
    // this.props.getBoard(this.props.boardId);
  }
  componentWillReceiveProps(nextProps) {
    console.log("Component will receive, current props are", this.props);
    console.log("Component will receive, next props are", nextProps);
  }

  render() {
    console.log(this.props.board);
    return <div>In Board Display Container</div>;
  }
}

const mapStateToProps = state => {
  return {
    board: state.board.currentBoard
  };
};

export default connect(mapStateToProps, actions)(BoardDisplayContainer);
