import React, { Component } from "react";
import Board from "../components/board/Board";
import "../Bulletin.css";

class BulletinContainer extends Component {
  render() {
    return (
      <div className="bulletin">
        <h3>{this.props.board.subject} Resources</h3>
        <div className="board">
          <Board />
        </div>
        <div className="menu" />
      </div>
    );
  }
}

export default BulletinContainer;
