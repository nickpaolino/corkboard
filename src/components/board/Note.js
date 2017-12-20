import React, { Component } from "react";
import "../../Board.css";

import Draggable from "react-draggable";

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
          <div className="note" style={this.style}>
            <p>Note</p>
          </div>
        </Draggable>
      </div>
    );
  }
}

export default Note;
