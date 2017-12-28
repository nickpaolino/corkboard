import React, { Component } from "react";
import Board from "../components/board/Board";
import "../Bulletin.css";
import { connect } from "react-redux";
import * as actions from "../actions/notes.js";

class BulletinContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      deletedNotes: [],
      movedNotes: [],
      notesUpdated: false
    };
  }

  componentDidMount() {
    // fetch notes for that board
    this.props.fetchNotes(this.props.board.id);
  }

  componentWillReceiveProps(nextProps) {
    this.mapNotes(nextProps);
  }

  mapNotes = (notes, updatedNote) => {
    if (notes) {
      this.setState({ notes: [...notes.notesList] });
    } else {
      const newNotes = this.state.notes.map(note => {
        if (note.id === updatedNote.id) {
          note.left_position = updatedNote.left_position;
          note.top_position = updatedNote.top_position;
          return note;
        } else {
          return note;
        }
      });
      this.setState({ notes: newNotes });
    }
  };

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
    console.log("Deleting", id);
    this.props.deleteNote(id, this.props.board.id);
    // const notesList = this.state.notes.filter(note => note.id !== id);
    // const notes = { notesList };
    // console.log(notes.notesList);
    // this.mapNotes(notes);
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
          deletedNotes={this.state.deletedNotes}
          movedNotes={this.state.movedNotes}
          mapNotes={this.mapNotes}
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
    user: state.auth.currentUser,
    noteUpdated: state.board.noteUpdated
  };
};

export default connect(mapStateToProps, actions)(BulletinContainer);
