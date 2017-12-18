import React, { Component } from "react";
import ActionCable from "actioncable";

class Chatroom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chats: [],
      value: "",
      channelCable: {},
      channelSubscribed: true
    };
  }

  componentDidMount() {
    // this.fetchPreviousMessages();
    this.subscribeChannel(this.props.boardId);
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

  subscribeChannel = channel => {
    const cable = ActionCable.createConsumer("ws://localhost:3000/cable");
    const channelSubscription = cable.subscriptions.create(
      {
        channel: `RoomChannel`,
        room: channel
      },
      {
        received: data => {
          const text = data.username + ": " + data.content;
          this.setState({ channelSubscribed: true });
          this.addChat(text);
        }
      }
    );
    this.setState({
      channelCable: channelSubscription
    });
  };

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  componentWillReceiveProps(nextProps) {
    // Only subscribe to the channel if it hasn't already been subscribed OR the channel id has changed

    const channelIdChanged = this.props.boardId !== nextProps.boardId;

    if (!this.state.channelSubscribed || channelIdChanged) {
      if (this.state.channelCable.consumer) {
        this.state.channelCable.unsubscribe();
      }
      this.subscribeChannel(nextProps.boardId);
    }
  }

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
