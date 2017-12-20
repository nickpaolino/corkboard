import React, { Component } from "react";
import "../../Board.css";

import Note from "./Note";

class Board extends Component {
  constructor() {
    super();
    this.state = {
      notes: []
    };
  }

  add = () => {
    this.setState(pState => ({
      notes: [...pState.notes, { id: this.nextId(), note: "New Note" }]
    }));
  };

  nextId() {
    this.uniqueId = this.uniqueId || 0;
    return this.uniqueId++;
  }

  eachNote = note => {
    return (
      <Note key={note.id} id={note.id}>
        {note.note}
      </Note>
    );
  };

  render() {
    return (
      <div className="board">
        {this.state.notes.map(this.eachNote)}
        <button onClick={this.add}>+</button>
      </div>
    );
  }
}

export default Board;
