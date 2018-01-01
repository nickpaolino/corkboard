import React, { Component } from "react";
import { connect } from "react-redux";
import withAuth from "../components/hocs/withAuth";
import Board from "../components/board/Board";
import "../home.css";

class ProfileContainer extends Component {
  state = {
    notes: [],
    reset: false
  };

  handleDelete = () => {};

  mapNotes = (notes, updatedBoard) => {
    if (notes) {
      this.setState({ notes: [...notes.notesList], reset: false });
    }
  };

  componentDidMount() {
    if (this.props.user.boards) {
      const notes = this.props.user.boards.map(board => {
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
    }
  }

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
          <div className="menu">
            <button className="add" onClick={this.add}>
              +
            </button>
          </div>
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
