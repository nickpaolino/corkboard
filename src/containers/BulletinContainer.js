import React, { Component } from "react";
import Board from "../components/board/Board";
import "../Bulletin.css";
import { connect } from "react-redux";
import * as actions from "../actions/notes.js";

class BulletinContainer extends Component {
  state = {
    notes: []
  };

  componentDidMount() {
    // fetch notes for that board
    this.props.fetchNotes(this.props.board.id);
  }

  componentWillReceiveProps(nextProps) {
    console.log("in component will receive props", nextProps.notesList);
    this.setState({ notes: [...nextProps.notesList] });
  }

  add = () => {
    // Create a new note object here instead of mapping down to the Note component first
    const note = {
      left: this.randomLeft(),
      top: this.randomTop()
    };

    this.createNote(note);
  };

  createNote = note => {
    const formattedNote = this.formatNote(note);
    this.props.createNote(formattedNote);
  };

  updateNote = updatedNote => {
    this.props.updateNote(updatedNote);
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

  randomLeft = () => {
    return Math.ceil(Math.random() * 480 + 20) + "px";
  };

  randomTop = () => {
    return Math.ceil(Math.random() * 200) + "px";
  };

  handleDelete = id => {
    // this.props.deleteNote(id);
  };

  render() {
    return (
      <div className="bulletin">
        <h3>{this.props.board.subject} Resources</h3>
        <Board
          notes={this.state.notes}
          handleDelete={this.handleDelete}
          updateNotes={this.updateNotes}
          noteDeleted={this.props.noteDeleted}
        />
        <div className="menu">
          <button className="add" onClick={this.add}>
            +
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notesList: state.board.notes,
    noteCreated: state.board.noteCreated,
    noteDeleted: state.board.noteDeleted,
    board: state.board.currentBoard,
    user: state.auth.currentUser
  };
};

export default connect(mapStateToProps, actions)(BulletinContainer);
