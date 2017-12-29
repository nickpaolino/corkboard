import React, { Component } from "react";
import Draggable from "react-draggable";
import { Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import "../../Board.css";

class Note extends Component {
  constructor(props) {
    super(props);

    this.style = {
      left: this.props.left,
      top: this.props.top
    };

    this.state = {
      deleted: false,
      movedNotes: []
    };
  }

  handleDelete = () => {
    this.setState({
      deleted: true
    });
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
      left_position: newLeft + "px",
      top_position: newTop + "px"
    };
  };

  handleStop = e => {
    if (e.target.className !== "delete icon") {
      this.deleted = false;
      let style = this.style;
      let transform = this.extractTransform(this.noteDiv.style.transform);
      this.createNewStyle(style, transform);
      // This is triggers a patch request
      this.props.updateNote({ ...this.transformedStyle, id: this.props.id });
      if (!this.state.movedNotes.includes(this.props.id)) {
        this.setState({
          movedNotes: [...this.state.movedNotes, this.props.id]
        });
      }
    }
  };

  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps.id, nextProps.left, nextProps.top);
  //   if (nextProps.updated) {
  //     this.style = {
  //       left: nextProps.left,
  //       top: nextProps.top
  //     };
  //   }
  // }

  render() {
    if (this.state.deleted) {
      this.style = { ...this.style, opacity: "0" };
    }
    console.log("Rendering", this.props.id, this.style);
    return (
      <Draggable onStop={this.handleStop} bounds="parent">
        <div
          className="note"
          onChange={this.handleChange}
          ref={div => (this.noteDiv = div)}
          style={this.style}
        >
          <Icon
            ref={div => (this.deleteButton = div)}
            onClick={this.handleDelete}
            name="delete"
          />
          {this.props.id}
        </div>
      </Draggable>
    );
  }
}

const mapStateToProps = state => {
  return {
    board: state.board.currentBoard,
    justFetchedBoard: state.board.justFetchedBoard
  };
};

export default connect(mapStateToProps)(Note);
