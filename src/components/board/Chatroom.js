import React, { Component } from "react";
import ActionCable from "actioncable";

class Chatroom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chats: [],
      value: "",
      channelSubscribed: false
    };
  }

  componentDidMount() {
    // this.fetchPreviousMessages();
    // Have to change channels when the component isn't mounting again
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
    console.log("subscribing to channel #", channel);
    const cable = ActionCable.createConsumer("ws://localhost:3000/cable");
    cable.subscriptions.create(
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
  };

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  componentWillReceiveProps(nextProps) {
    this.subscribeChannel(nextProps.boardId);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     this.props.boardId !== nextProps.boardId ||
  //     this.state.chats.length !== nextState.chats.length
  //   );
  // }

  render() {
    // console.log(this.state.channelSubscribed);
    // {
    //   this.state.channelSubscribed ? "" : this.subscribeChannel();
    // }
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
