import React, { Component } from "react";
import Draggable from "react-draggable";
import "../../Board.css";

class Note extends Component {
  componentDidMount() {
    // bottom right - left: "75%", top: "55%"
    // bottom left - left: "2%", top: "55%"
    // bottom left - left: "2%", top: "0%"
    // bottom left - left: "75%", top: "0%"

    this.style = {
      left: this.randomLeft(),
      top: this.randomTop()
    };

    this.randomLeft();
  }

  randomLeft = () => {
    return Math.random() * 73 + 2 + "%";
  };

  randomTop = () => {
    return Math.random() * 55 + "%";
  };

  render() {
    return (
      <Draggable onDrag={this.handleDrag} bounds="parent">
        <div className="note" style={this.style} />
      </Draggable>
    );
  }
}

export default Note;
