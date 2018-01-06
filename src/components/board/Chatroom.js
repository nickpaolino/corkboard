import React, { Component } from "react";
import ActionCable from "actioncable";
import Message from "./Message";
import { api } from "../../services/api";
import "../../Chatroom.css";

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
    this.scrollToMessage();
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
    api.chatroom
      .fetchPreviousMessages(boardId, token)
      .then(json => this.formatMessages(json));
  };

  postMessage = () => {
    const body = {
      content: this.state.value,
      user_id: this.props.user.id,
      board_id: this.props.board.id
    };
    api.chatroom.postMessage(body);
  };

  componentDidUpdate() {
    this.scrollToMessage();
  }

  scrollToMessage() {
    this.chats.scrollTop = this.chats.scrollHeight;
  }

  subscribeChannel = channel => {
    const cable = ActionCable.createConsumer(
      "ws://corkboard-backend.herokuapp.com/cable"
    );
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
        <h3>Chat about {this.props.board.subject}</h3>
        <ul className="chats" ref={ul => (this.chats = ul)}>
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
          <input type="submit" value="Send" />
        </form>
      </div>
    );
  }
}

export default Chatroom;
