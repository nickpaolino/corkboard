import React, { Component } from "react";
import Draggable from "react-draggable";
import "../../Board.css";

class Note extends Component {
  componentDidMount() {
    this.style = {
      right: this.randomBetween(0, window.innerWidth - 150, "px"),
      top: this.randomBetween(0, window.innerHeight - 150, "px")
    };
  }

  randomBetween(x, y, s) {
    return x + Math.ceil(Math.random() * (y - x)) + s;
  }

  render() {
    return (
      <div>
        <Draggable>
          <div className="note" style={this.style} />
        </Draggable>
      </div>
    );
  }
}

export default Note;
