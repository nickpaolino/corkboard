import React, { Component } from "react";

class Message extends Component {
  render() {
    return (
      <div>
        <li
          className={`chat ${
            this.props.user === this.props.chat.username ? "right" : "left"
          }`}
        >
          <p>{this.props.chat.content}</p>
        </li>
        <li
          className={`chat_label ${
            this.props.user === this.props.chat.username ? "right" : "left"
          }`}
        >
          <p className="user">{this.props.chat.username}</p>
        </li>
      </div>
    );
  }
}

export default Message;
