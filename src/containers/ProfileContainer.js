import React, { Component } from "react";
import { connect } from "react-redux";
import withAuth from "../components/hocs/withAuth";
import Board from "../components/board/Board";
import "../home.css";

class ProfileContainer extends Component {
  state = {
    notes: [
      {
        id: 5000,
        subject: "Mozart",
        left_position: "20px",
        top_position: "0px"
      }
    ],
    reset: false
  };

  handleDelete = () => {};

  mapNotes = (notes, updatedBoard) => {
    if (notes) {
      this.setState({ notes: [...notes.notesList], reset: false });
    }
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
    auth: {
      user: state.auth.currentUser
    }
  };
};

export default withAuth(connect(mapStateToProps)(ProfileContainer));
