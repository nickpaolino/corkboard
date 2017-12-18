import React, { Component } from "react";
import ActionCable from "actioncable";
import Message from "./Message";
import ReactDOM from "react-dom";
import "../../Chatroom.css";

class Chatroom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chats: [],
      value: "",
      channelCable: {},
      channelSubscribed: true,
      chats: []
    };
  }

  componentDidMount() {
    this.scrollToBot();
    this.fetchPreviousMessages(this.props.board.id);
    this.subscribeChannel(this.props.board.id);
  }

  addChat(chat) {
    this.setState({
      chats: [
        ...this.state.chats,
        {
          content: chat.content,
          username: chat.username
        }
      ]
    });
  }

  formatMessages = json => {
    const messages = json.map(message => {
      return {
        content: message.content,
        username: message.username
      };
    });
    this.setState({
      chats: messages
    });
  };

  fetchPreviousMessages = boardId => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/api/v1/messages/${boardId}`, {
      headers: {
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(json => this.formatMessages(json));
  };

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
        board_id: this.props.board.id
      })
    }).then(res => console.log(res));
  };

  componentDidUpdate() {
    this.scrollToBot();
  }

  scrollToBot() {
    ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(
      this.refs.chats
    ).scrollHeight;
  }

  subscribeChannel = channel => {
    const cable = ActionCable.createConsumer("ws://localhost:3000/cable");
    const channelSubscription = cable.subscriptions.create(
      {
        channel: `RoomChannel`,
        room: channel
      },
      {
        received: data => {
          this.setState({ channelSubscribed: true });
          this.addChat(data);
        }
      }
    );
    this.setState({
      channelCable: channelSubscription
    });
  };

  componentWillReceiveProps(nextProps) {
    // Only subscribe to the channel if it hasn't already been subscribed OR the channel id has changed

    const channelIdChanged = this.props.board.id !== nextProps.board.id;

    if (!this.state.channelSubscribed || channelIdChanged) {
      this.fetchPreviousMessages(nextProps.board.id);
      if (this.state.channelCable.consumer) {
        this.state.channelCable.unsubscribe();
      }
      this.subscribeChannel(nextProps.board.id);
    }
  }

  submitMessage = e => {
    e.preventDefault();
    const chat = {
      content: this.textInput.value,
      username: this.props.user.username
    };

    this.postMessage();

    this.textInput.value = "";
  };

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  render() {
    return (
      <div className="chatroom">
        <h3>{this.props.board.subject}</h3>
        <ul className="chats" ref="chats">
          {this.state.chats.map((chat, index) => (
            <Message key={index} chat={chat} user={this.props.user.username} />
          ))}
        </ul>
        <form className="input" onSubmit={e => this.submitMessage(e)}>
          <input
            type="text"
            ref={input => (this.textInput = input)}
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Chatroom;
