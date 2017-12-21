import React, { Component } from "react";
import Board from "../components/board/Board";
import "../Bulletin.css";
import { connect } from "react-redux";

class BulletinContainer extends Component {
  state = {
    notes: []
  };

  componentDidMount() {
    // fetch notes for that board
  }

  add = () => {
    this.setState({
      notes: [...this.props.notesList, 0]
    });
  };

  handleDelete = id => {
    console.log(id);
  };

  updateNotes = note => {
    console.log(note);
  };

  render() {
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
    noteCreated: state.board.noteCreated
  };
};

export default connect(mapStateToProps)(BulletinContainer);
