import React, { Component } from "react";
import { connect } from "react-redux";
import withAuth from "../components/hocs/withAuth";
import Board from "../components/board/Board";
import { Modal, Button, Icon } from "semantic-ui-react";
import "../home.css";
import CreateBoardContainer from "./CreateBoardContainer";

class ProfileContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      reset: false,
      modalOpen: false
    };
  }

  handleDelete = () => {};

  mapNotes = (notes, updatedBoard) => {
    if (notes) {
      this.setState({ notes: [...notes.notesList], reset: false });
    }
  };

  componentDidMount() {
    if (this.props.user.boards) {
      this.filterNotes(this.props.user.boards);
    }
  }

  filterNotes = boards => {
    const notes = boards.map(board => {
      return {
        id: board.id,
        caption: board.subject,
        left_position: board.left_position,
        top_position: board.top_position,
        link: `http://localhost:3001/boards/${board.id}`,
        isBoard: true
      };
    });

    this.setState({ notes });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.user.boards.length !== nextProps.user.boards.length) {
      this.filterNotes(nextProps.user.boards);
    }
  }

  add = () => {
    this.props.history.push("/boards/new");
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  showModal = () => {
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
            <Icon name="x" /> Close
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
          <Board
            notes={this.state.notes}
            handleDelete={this.handleDelete}
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
