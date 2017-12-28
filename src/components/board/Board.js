import React, { Component } from "react";
import "../../Board.css";
import Note from "./Note";
import { connect } from "react-redux";
import * as actions from "../../actions/notes.js";

class Board extends Component {
  updateNote = updatedNote => {
    this.props.updateNote(updatedNote, this.props.board.id);
  };

  formatNote = note => {
    return {
      medium: {
        user_id: this.props.user.id,
        board_id: this.props.board.id,
        left_position: note.left,
        top_position: note.top
      }
    };
  };

  render() {
    return (
      <div className="board">
        {this.props.notes.map((note, index) => {
          console.log(
            "In board, note #",
            note.id,
            "is deleted:",
            this.props.deletedNotes.includes(note.id)
          );
          console.log("Rendering", note);
          return (
            <Note
              key={index}
              id={note.id ? note.id : ""}
              startingPosition={note.left_position ? note : false}
              handleDelete={this.props.handleDelete}
              createNote={this.createNote}
              updateNote={this.updateNote}
              noteDeleted={this.props.noteDeleted}
              deletedNotes={this.props.deletedNotes}
              moved={note.moved}
              movedNotes={this.props.movedNotes}
            />
          );
        })}
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

export default connect(mapStateToProps, actions)(Board);
