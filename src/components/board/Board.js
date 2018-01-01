import React, { Component } from "react";
import "../../Board.css";
import Note from "./Note";
import { connect } from "react-redux";
import * as actions from "../../actions/notes.js";

class Board extends Component {
  updateNote = updatedNote => {
    this.props.updateNote(updatedNote, this.props.user.id);
    this.props.mapNotes(null, updatedNote);
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
          return (
            <Note
              key={index}
              id={note.id}
              left={note.left_position ? note.left_position : "20px"}
              top={note.top_position ? note.top_position : "0px"}
              handleDelete={this.props.handleDelete}
              updateNote={this.updateNote}
              updated={note.updated ? true : false}
              text={note.caption ? note.caption : undefined}
              link={note.link ? note.link : ""}
              isBoard={note.isBoard ? true : false}
              history={this.props.history ? this.props.history : null}
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
