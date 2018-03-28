import React, { Component } from "react";
import "../../Board.css";
import Note from "./Note";
import { connect } from "react-redux";
import * as actions from "../../actions/notes.js";

/* This component is an intermediary between the BulletinContainer and the
individual Note components. It is responsible for restructuring the note data
passed down as props from the BulletinContainer and structuring it in the
right way for the Note component to render. It also communicates any updates to a specific
note to the API that excludes creating/deleting which is the task of the BulletinContainer */

class Board extends Component {
  // the note component calls this when a note is moved
  updateNote = updatedNote => {
    // the action creator responsible for updating the note is called
    this.props.updateNote(updatedNote, this.props.user.id);

    // the BulletinContainer's mapNotes function is called to reset its notes
    // state so that when it re-renders it has the correct note data
    this.props.mapNotes(null, updatedNote);
  };

  render() {
    return (
      <div className="board">
        {this.props.notes.map((note, index) => {
          return (
            // each of the note objects mapped through renders to the note component
            <Note
              key={index}
              // the note's id for deleting, editing, and updating
              id={note.id}
              // the X position is read or set as 20px by default
              left={note.left_position ? note.left_position : "20px"}
              // the Y position is read or set as 0px by default
              top={note.top_position ? note.top_position : "0px"}
              // the BulletinContainer's function for removing a note
              handleDelete={this.props.handleDelete}
              // this component's function for updating a note in the API
              updateNote={this.updateNote}
              // the text displayed on a note
              text={note.caption ? note.caption : undefined}
              // the URL linked to a note, if there's one
              link={note.link ? note.link : ""}
              // these components are used to visualize a user's boards,
              // this prop records if we're rendering a board represented as a note
              // or a normal note
              isBoard={note.isBoard ? true : false}
              // passes React router's history prop down for the note's handleRedirect function
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
