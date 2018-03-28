import React, { Component } from "react";
import Board from "../components/board/Board";
import "../Bulletin.css";
import { connect } from "react-redux";
import * as actions from "../actions/notes.js";
import { Modal, Icon, Header, Button } from "semantic-ui-react";
import UserList from "../components/create/UserList";
import { api } from "../services/api";

/* This component is responsible for interacting with the API endpoints for the
board's notes. It reads from the Redux store and sends the notes down to the Board
component which is responsible for rendering each note component. */

class BulletinContainer extends Component {
  state = {
    // the notes array stores all the note objects from the API to be passed down as props
    notes: [],
    reset: false,
    nextProps: {},
    modalOpen: false,
    users: [],
    invitedUsers: []
  };

  componentDidMount() {
    // fetch notes for that board from the API
    this.props.fetchNotes(this.props.board.id);
    this.props.getUsers();
  }

  componentWillReceiveProps(nextProps) {
    // if the last and next board don't have the same id this hasn't already been checked
    if (this.props.board.id !== nextProps.board.id && !this.state.reset) {
      // then reset the board's notes and set the reset to true to indicate that the board has changed
      this.setState({ notes: [], reset: true });
    } else {
      // otherwise go ahead and set the notes
      this.mapNotes(nextProps);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // if the board has been reset then fill the notes array with the next props
    if (nextState.reset) {
      this.mapNotes(nextProps);
    }
    return true;
  }

  mapNotes = (notes, updatedBoard) => {
    if (notes) {
      // if the notes have been collected from the API, set the state with them
      this.setState({ notes: [...notes.notesList], reset: false });
    }
  };

  add = () => {
    // Create a new note object here instead of mapping down to the Note component first
    const note = {
      left: this.randomLeft(),
      top: this.randomTop()
    };

    // by creating the note here, the BulletinContainer is the sole manager of the notes
    this.createNote(note);
  };

  createNote = note => {
    // create a formatted note object
    const formattedNote = this.formatNote(note);
    // send this newly created note to the API to be created in data
    this.props.createNote(formattedNote);
  };

  formatNote = note => {
    // create the note object with the necessary keys for its database creation
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
    // pick a random X axis value for the note's starting position
    return Math.ceil(Math.random() * 600 + 20) + "px";
  };

  randomTop = () => {
    // pick a random Y axis value for the note's starting position
    return Math.ceil(Math.random() * 180) + "px";
  };

  handleDelete = id => {
    // deletes the note from the database with the note's id and the board id
    this.props.deleteNote(id, this.props.board.id);
  };

  handleOpen = () => {
    // handles the opening of the members modal
    this.setState({ modalOpen: true });
    // this gets the list of the users who are not on the board for the add feature
    this.getOtherUsers();
  };

  // handles the closing of the members modal
  handleClose = () => this.setState({ modalOpen: false });

  getOtherUsers = () => {
    // the user ids from the current board are collected
    const userIds = this.props.board.users.map(user => user.id);

    // collects all the user ids with ids not part of the current board
    const otherUsers = this.props.users.filter(user => {
      return !userIds.includes(user.id);
    });

    // gets the user's name by mapping through the otherUsers data
    const users = otherUsers.map(user => {
      return user.username;
    });

    // sets the state with the user list from users not part of this board
    this.setState({ users });
  };

  addUser = invitedUsers => {
    // sets the state with the newly invited users
    this.setState({ invitedUsers });
  };

  // this function is triggered when the invite button is selected
  inviteUsers = () => {
    // check that there are invited users before proceeding
    if (!!this.state.invitedUsers.length) {
      // call action creator to send a request to the API to update the board with the new users
      this.props
        .addUsersToBoard(this.props.board.id, this.state.invitedUsers)
        .then(() =>
          // send another request to the API to create notes representing these newly invited users'
          // new board on each of their profile page
          api.boards.createBoardPositions(this.props.board.board_users)
        );

      // close the members modal after the inviting has been finished
      this.handleClose();
    }
  };

  // this shows the member modal with all of its content
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
            const isCurrentUser = this.props.user.id === user.id;
            return (
              <div
                key={user.id}
                style={{
                  fontFamily: "Ubuntu",
                  fontSize: "15px",
                  padding: "5px"
                }}
              >
                {isCurrentUser ? "You" : user.username}
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
        {/* this is the title for the bulletin board */}
        <h3>{this.props.board.subject} Resources</h3>
        {/* the board component is passed the board's notes,
        the handleDelete function for removing notes,
        and the mapNotes function for setting the notes state here. */}
        <Board
          notes={this.state.notes}
          handleDelete={this.handleDelete}
          mapNotes={this.mapNotes}
        />
        {/* the menu is the bottom of the bulletin board where the + and members buttons are found */}
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

// the boards' notes, the board, the user, and the full list of users in the app are read
// from the Redux store and mapped to this component's props
const mapStateToProps = state => {
  return {
    notesList: state.board.notes,
    board: state.board.currentBoard,
    user: state.auth.currentUser,
    users: state.auth.users
  };
};

export default connect(mapStateToProps, actions)(BulletinContainer);
