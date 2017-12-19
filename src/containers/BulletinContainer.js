import React, { Component } from "react";
import "../Bulletin.css";

class BulletinContainer extends Component {
  render() {
    return (
      <div className="bulletin">
        <h3>{this.props.board.subject} Resources</h3>
        <div className="board" />
        <div className="menu" />
      </div>
    );
  }
}

export default BulletinContainer;
