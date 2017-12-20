import React, { Component } from "react";
import "../../Board.css";

import Note from "./Note";

class Board extends Component {
  eachNote = note => {
    return (
      <Note key={note.id} id={note.id}>
        {note.note}
      </Note>
    );
  };

  render() {
    return <div className="board">{this.props.notes.map(this.eachNote)}</div>;
  }
}

export default Board;
