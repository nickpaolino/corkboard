import React, { Component } from "react";
import { connect } from "react-redux";
import withAuth from "../components/hocs/withAuth";
import Board from "../components/board/Board";
import { Modal, Button, Icon } from "semantic-ui-react";
import "../home.css";
import CreateBoardContainer from "./CreateBoardContainer";

class ProfileContainer extends Component {
  state = {
    notes: [],
    reset: false,
    modalOpen: false
  };

  mapNotes = (notes, updatedBoard) => {
    if (notes) {
      // updates notes' positions
      this.setState({ notes: [...notes.notesList], reset: false });
    }
  };

  componentDidMount() {
    if (this.props.user.boards) {
      const notes = this.props.user.boards.map(board => {
        const { id, subject, left_position, top_position } = board;
        // each board is mapped into a note object structured for the note component
        return {
          id,
          caption: subject,
          left_position,
          top_position,
          link: `http://localhost:3001/boards/${id}`,
          isBoard: true
        };
      });

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
            mapNotes={this.mapNotes}
            history={this.props.history}
          />
          <div className="menu">{this.showModal()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.currentUser
  };
};

export default withAuth(connect(mapStateToProps)(ProfileContainer));
