import React, { Component } from "react";
import Draggable from "react-draggable";
import { Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../../actions/notes.js";
import "../../Board.css";

class Note extends Component {
  constructor(props) {
    super(props);

    if (!this.props.startingPosition) {
      this.style = {
        left: this.randomLeft(),
        top: this.randomTop()
      };
    } else {
      this.style = {
        left: this.props.startingPosition.left,
        top: this.props.startingPosition.top
      };
    }
    this.props.createNote({ ...this.style, id: this.props.id });
  }

  randomLeft = () => {
    return Math.ceil(Math.random() * 480 + 20) + "px";
  };

  randomTop = () => {
    return Math.ceil(Math.random() * 200) + "px";
  };

  handleDelete = () => {
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
      left: newLeft + "px",
      top: newTop + "px"
    };
  };

  handleStop = e => {
    let style = this.style;
    let transform = this.extractTransform(this.noteDiv.style.transform);
    this.createNewStyle(style, transform);
    this.props.createNote(this.transformedStyle);
  };

  render() {
    return (
      <Draggable onStop={this.handleStop} bounds="parent">
        <div
          className="note"
          onChange={this.handleChange}
          ref={div => (this.noteDiv = div)}
          style={this.style}
        >
          <Icon onClick={this.handleDelete} name="delete" />
          {this.props.text}
        </div>
      </Draggable>
    );
  }
}

export default connect(null, actions)(Note);
