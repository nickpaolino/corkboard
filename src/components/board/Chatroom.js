import React, { Component } from "react";
import ActionCable from "actioncable";

class Chatroom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chats: [],
      value: ""
    };
  }

  componentDidMount() {
    this.subscribeChannel();
  }

  addChat(chat) {
    this.state.chats.push(chat);
    this.setState({
      chats: this.state.chats
    });
  }

  postMessage = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/api/v1/messages", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token
      },
      method: "POST",
      body: JSON.stringify({
        content: this.state.value,
        user_id: this.props.user.id,
        board_id: this.props.boardId
      })
    }).then(res => console.log(res));
  };

  subscribeChannel = () => {
    const cable = ActionCable.createConsumer("ws://localhost:3000/cable");
    cable.subscriptions.create(
      {
        channel: `RoomChannel`,
        room: this.props.boardId
      },
      {
        received: data => {
          const text = data.username + ": " + data.content;
          console.log(data);
          this.addChat(text);
        }
      }
    );
  };

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  render() {
    return (
      <div>
        {this.state.chats.map((chat, index) => {
          return <p key={index}>{chat}</p>;
        })}
        <form>
          <input onChange={this.handleChange} type="text" />
          <button
            onClick={e => {
              e.preventDefault();
              this.postMessage();
            }}
          >
            Post
          </button>
        </form>
      </div>
    );
  }
}

export default Chatroom;
