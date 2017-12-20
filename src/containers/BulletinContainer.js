import React, { Component } from "react";
import Board from "../components/board/Board";
import "../Bulletin.css";

class BulletinContainer extends Component {
  state = {
    notes: []
  };

  add = () => {
    this.setState(pState => ({
      notes: [...pState.notes, { id: this.nextId() }]
    }));
  };

  nextId() {
    this.uniqueId = this.uniqueId || 0;
    return this.uniqueId++;
  }

  render() {
    return (
      <div className="bulletin">
        <h3>{this.props.board.subject} Resources</h3>
        <Board notes={this.state.notes} />
        <div className="menu">
          <button onClick={this.add}>+</button>
        </div>
      </div>
    );
  }
}

export default BulletinContainer;
