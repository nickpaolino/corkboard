import React, { Component } from "react";
import { connect } from "react-redux";
import withAuth from "../components/hocs/withAuth";
import Board from "../components/board/Board";
import { Modal, Button, Icon } from "semantic-ui-react";
import "../home.css";
import CreateBoardContainer from "./CreateBoardContainer";

/* This component deals with the route at '/' and is responsible for rendering
 a draggable board representation of all the user's boards as notes.
 The CreateBoardContainer is appropriated through this component as a modal.
 It reads from the Redux store and is wrapped in the withAuth hoc */

class ProfileContainer extends Component {
  state = {
    // these notes are the user's boards
    notes: [],
    // this state records if the CreateBoardContainer modal is open or not
    modalOpen: false
  };

  mapNotes = (notes, updatedBoard) => {
    if (notes) {
      // updates the notes' positions
      this.setState({ notes: [...notes.notesList] });
    }
  };

  componentDidMount() {
    // after the component mounts, check if the user's boards have been sent through the Redux store
    if (this.props.user.boards) {
      // if they have, then map through each board and make it a note object
      const notes = this.props.user.boards.map(board => {
        const { id, subject, left_position, top_position } = board;
        // these note objects are structured for the Note component
        return {
          id,
          caption: subject,
          left_position,
          top_position,
          link: `http://corkboard.surge.sh/boards/${id}`,
          isBoard: true
        };
      });

      // set the state with these note objects
      this.setState({ notes });
    }
  }

  // sets the state to make sure that the modal is opened
  handleOpen = () => this.setState({ modalOpen: true });

  // this does the same for the modal's close
  handleClose = () => this.setState({ modalOpen: false });

  showModal = () => {
    // this modal renders the CreateBoardContainer component
    return (
      <Modal
        trigger={
          <button className="add" onClick={this.handleOpen}>
            +
          </button>
        }
        size="small"
        open={this.state.modalOpen}
      >
        <Modal.Content>
          <CreateBoardContainer history={this.props.history} />
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
      <div>
        <div className="home">
          <h3>Your Boards</h3>
          {/* the boards are passed down to the board component which renders them as notes */}
          <Board
            notes={this.state.notes}
            // the mapNotes function resets the notes state
            mapNotes={this.mapNotes}
            // the React Router history property is needed to access the current URL */}
            history={this.props.history}
          />
          {/* the showModal function returns the modal if the state is set to open */}
          <div className="menu">{this.showModal()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // the current user is extracted from the Redux store
    // this includes the user's boards and the entire subject list
    user: state.auth.currentUser
  };
};

export default withAuth(connect(mapStateToProps)(ProfileContainer));
