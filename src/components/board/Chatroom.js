import React, { Component } from "react";
import ActionCable from "actioncable";
import Message from "./Message";
import { api } from "../../services/api";
import "../../Chatroom.css";

/* This component represents the entire chat box that is shown on each board page.
It deals with all of the communication with the Rails Action Cable that allows it to be
a real-time chat. */

class Chatroom extends Component {
  state = {
    // this holds the content and corresponding usernames for each message
    chats: [],
    // this is the value of the chat input box
    value: "",
    // this stores the action cable channel subscription object
    channelCable: {},
    // this tells if the channel has been subscribed to or not yet to avoid subscribing multiple times
    channelSubscribed: true
  };

  componentDidMount() {
    // scroll to where in the chat is most recent
    this.scrollToMessage();
    // fetch the previous messages
    this.fetchPreviousMessages(this.props.board.id);
    // subscribe to the action cable channel
    this.subscribeChannel(this.props.board.id);
  }

  // this sets the state with new messages that come from the action cable web socket
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

  // this formats the messages and sets state with the data from the API on the first load
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

  // this fetches the previous messages from the database
  fetchPreviousMessages = boardId => {
    const token = localStorage.getItem("token");
    api.chatroom
      .fetchPreviousMessages(boardId, token)
      .then(json => this.formatMessages(json));
  };

  // this formats and posts a message into the chatroom via the API
  postMessage = () => {
    const body = {
      content: this.state.value,
      user_id: this.props.user.id,
      board_id: this.props.board.id
    };

    // after posting it in the API, this component automatically reads it through the web socket
    api.chatroom.postMessage(body);
  };

  componentDidUpdate() {
    // every time the component's updated, the most recent messages should be showing
    this.scrollToMessage();
  }

  scrollToMessage() {
    // this ensures that the chat is scrolled down to wherever the most recent messages are
    this.chats.scrollTop = this.chats.scrollHeight;
  }

  // this function deals with subscribing to the action cable web socket
  subscribeChannel = channel => {
    // the /cable route is the backend entry point for all channels
    const cable = ActionCable.createConsumer("ws://localhost:3000/cable");

    // the channel subscription is created with the channel name and the specific room
    const channelSubscription = cable.subscriptions.create(
      {
        channel: `RoomChannel`,
        // the room property here is synonymous with the board id
        room: channel
      },
      {
        // this is how the data is received via the channel subscription
        received: data => {
          this.setState({ channelSubscribed: true });
          // the newly received messages are added to the state
          this.addChat(data);
        }
      }
    );

    this.setState({
      // the state is updated with the channel subscription object
      channelCable: channelSubscription
    });
  };

  componentWillReceiveProps(nextProps) {
    // this ensures that we only subscribe to the channel if it hasn't already been subscribed
    // OR the channel id has changed
    const channelIdChanged = this.props.board.id !== nextProps.board.id;

    // if the channel hasn't been subscribed and the id hasn't changed
    if (!this.state.channelSubscribed || channelIdChanged) {
      // then fetch the previosu messages
      this.fetchPreviousMessages(nextProps.board.id);

      // if a consumer object exists, then we're currently subscribed to an
      // old channel and need to unsubscribe
      if (this.state.channelCable.consumer) {
        this.state.channelCable.unsubscribe();
      }

      // subscribe to the new channel with the board id of the board we just loaded
      this.subscribeChannel(nextProps.board.id);
    }
  }

  // when the message is submitted
  submitMessage = e => {
    // prevent the default refresh
    e.preventDefault();

    // post the message to the API
    this.postMessage();

    // set the input text box value to empty
    this.textInput.value = "";
  };

  // handles the input text box's change
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
          {/* for each message, map to the Message component to show the message */}
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
