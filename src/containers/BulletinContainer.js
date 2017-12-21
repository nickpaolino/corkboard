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
    console.log("In componentDidMount");
    console.log(this.props.board.id);
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

    // this.setState({
    //   notes: [...this.props.notesList, 0]
    // });
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

  handleDelete = () => {
    this.props.handleDelete(this.props.id);
  };

  extractTransform = transform => {
    transform = transform.split("(");
    transform = transform[1].split(")");
    transform = transform[0].split(", ");
    let transformLeft = transform[0];
    let transformTop = transform[1];
    return { left: transformLeft, top: transformTop };
  };

  createNewStyle = (style, transform) => {
    const styleLeft = parseInt(style.left.slice(0, style.left.length - 2));
    const styleTop = parseInt(style.top.slice(0, style.top.length - 2));
    const transformLeft = parseInt(
      transform.left.slice(0, transform.left.length - 2)
    );
    const transformTop = parseInt(
      transform.top.slice(0, transform.top.length - 2)
    );

    const newLeft = styleLeft + transformLeft;
    const newTop = styleTop + transformTop;

    this.transformedStyle = {
      left: newLeft + "px",
      top: newTop + "px"
    };
  };

  handleDelete = id => {
    console.log(id);
  };

  updateNotes = note => {
    console.log(note);
  };

  render() {
    console.log(this.props);
    return (
      <div className="bulletin">
        <h3>{this.props.board.subject} Resources</h3>
        <Board
          notes={this.state.notes}
          handleDelete={this.handleDelete}
          updateNotes={this.updateNotes}
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
    board: state.board.currentBoard,
    user: state.auth.currentUser
  };
};

export default connect(mapStateToProps, actions)(BulletinContainer);
