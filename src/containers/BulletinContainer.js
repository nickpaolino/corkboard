import React, { Component } from "react";
import Board from "../components/board/Board";
import "../Bulletin.css";
import { connect } from "react-redux";
import * as actions from "../actions/notes.js";
import { Modal, Icon, Header, Button, List, Input } from "semantic-ui-react";
import UserList from "../components/create/UserList";
import { api } from "../services/api";

class BulletinContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      reset: false,
      nextProps: {},
      modalOpen: false,
      users: [],
      invitedUsers: []
    };
  }

  componentDidMount() {
    // fetch notes for that board
    this.props.fetchNotes(this.props.board.id);
    this.props.getUsers();
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

  handleOpen = () => {
    this.setState({ modalOpen: true });
    this.getOtherUsers();
  };

  handleClose = () => this.setState({ modalOpen: false });

  getOtherUsers = () => {
    const userIds = this.props.board.users.map(user => user.id);
    const otherUsers = this.props.users.filter(user => {
      return !userIds.includes(user.id);
    });

    const users = otherUsers.map(user => {
      return user.username;
    });

    this.setState({ users });
  };

  addUser = invitedUsers => {
    this.setState({ invitedUsers });
  };

  inviteUsers = () => {
    if (!!this.state.invitedUsers.length) {
      this.props
        .addUsersToBoard(this.props.board.id, this.state.invitedUsers)
        .then(() =>
          api.boards.createBoardPositions(this.props.board.board_users)
        );
      this.handleClose();
    }
  };

  showMemberModal = () => {
    return (
      <Modal
        trigger={
          <button
            style={{ width: "130px" }}
            className="members"
            onClick={this.handleOpen}
          >
            Members: {this.props.board.users.length}
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
                key={user.id}
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
          <div style={{ paddingTop: "10px" }}>
            <UserList users={this.state.users} addUser={this.addUser} isModal />
            <Button
              style={{ marginTop: "10px" }}
              color="green"
              onClick={this.inviteUsers}
            >
              <Icon name="user plus" /> Invite
            </Button>
          </div>
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
    user: state.auth.currentUser,
    users: state.auth.users
  };
};

export default connect(mapStateToProps, actions)(BulletinContainer);
