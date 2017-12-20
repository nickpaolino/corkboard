import React, { Component } from "react";
import "../../Board.css";
import Note from "./Note";

class Board extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="board">
        {this.props.notes.map((note, index) => {
          return (
            <Note
              key={index}
              id={note.id ? note.id : index}
              startingPosition={note.left ? note : false}
              handleDelete={this.props.handleDelete}
              updateNotes={this.props.updateNotes}
            />
          );
        })}
      </div>
    );
  }
}

export default Board;
