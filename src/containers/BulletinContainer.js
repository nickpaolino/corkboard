import React, { Component } from "react";
import Board from "../components/board/Board";
import "../Bulletin.css";
import { connect } from "react-redux";
import * as actions from "../actions/notes.js";
import { Modal, Icon, Header, Button, List } from "semantic-ui-react";

class BulletinContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      reset: false,
      nextProps: {},
      modalOpen: false
    };
  }

  componentDidMount() {
    // fetch notes for that board
    this.props.fetchNotes(this.props.board.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.board.id !== nextProps.board.id && !this.state.reset) {
      this.setState({ notes: [], reset: true });
    } else {
      this.mapNotes(nextProps);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.reset) {
      this.mapNotes(nextProps);
    }
    return true;
  }

  mapNotes = (notes, updatedBoard) => {
    if (notes) {
      this.setState({ notes: [...notes.notesList], reset: false });
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
    // Deletes the note from the database
    this.props.deleteNote(id, this.props.board.id);
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  showMemberModal = () => {
    console.log(this.props.board.users);
    return (
      <Modal
        trigger={
          <button className="members" onClick={this.handleOpen}>
            Members
          </button>
        }
        size="mini"
        open={this.state.modalOpen}
      >
        <Header
          style={{
            fontFamily: "Ubuntu"
          }}
        >
          <Icon name="thumb tack" />Members
        </Header>
        <Modal.Content>
          {this.props.board.users.map(user => {
            return (
              <div
                style={{
                  fontFamily: "Ubuntu",
                  fontSize: "15px",
                  padding: "5px"
                }}
              >
                {user.username}
              </div>
            );
          })}
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" onClick={this.handleClose}>
            <Icon name="hide" /> Hide
          </Button>
        </Modal.Actions>
      </Modal>
    );
  };

  render() {
    console.log(this.state.notes);
    return (
      <div className="bulletin">
        <h3>{this.props.board.subject} Resources</h3>
        <Board
          notes={this.state.notes}
          handleDelete={this.handleDelete}
          mapNotes={this.mapNotes}
        />
        <div className="menu">
          <button className="add" onClick={this.add}>
            +
          </button>
          <div className="friends list">{this.showMemberModal()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notesList: state.board.notes,
    board: state.board.currentBoard,
    user: state.auth.currentUser
  };
};

export default connect(mapStateToProps, actions)(BulletinContainer);
