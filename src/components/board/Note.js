import React, { Component } from "react";
import Draggable from "react-draggable";
import { Icon, Button, Modal, Header, Input } from "semantic-ui-react";
import { connect } from "react-redux";
import { api } from "../../services/api";
import * as actions from "../../actions/boards";
import "../../Board.css";

/* This component represents an individual note on either a resource-sharing board
or on the user's profile page. The note component is rendered through the Board component
from the BulletinContainer. To update a note, its movement is registered here and the
updates sent through the Board component to the API. */

class Note extends Component {
  constructor(props) {
    super(props);

    // before all else, determine the note's position and set on the class
    this.style = {
      left: this.props.left,
      top: this.props.top
    };

    this.state = {
      // records if the note's been deleted in the BulletinContainer & API
      deleted: false,
      movedNotes: [],
      editable: !this.props.text,
      value: this.props.text,
      modalOpen: false,
      link: this.props.link
    };
  }

  handleDelete = () => {
    /* sets the state to tell this note component that it's been deleted
    since the board is optimistically rendered, the component can't be deleted so
    the opacity is set to 0 until a refresh when the note is officially removed by
    not being re-rendered */
    this.setState({
      deleted: true
    });

    // this calls BulletinContainer's delete function to send a destroy request to the API
    this.props.handleDelete(this.props.id);
  };

  extractTransform = transform => {
    transform = transform.split("(");
    transform = transform[1].split(")");
    transform = transform[0].split(", ");
    let transformLeft = transform[0];
    let transformTop = transform[1];
    return { left: transformLeft, top: transformTop };
  };

  createNewStyle = (style, transform) => {
    const styleLeft = parseInt(style.left.slice(0, style.left.length - 2), 10);
    const styleTop = parseInt(style.top.slice(0, style.top.length - 2), 10);
    const transformLeft = parseInt(
      transform.left.slice(0, transform.left.length - 2),
      10
    );
    const transformTop = parseInt(
      transform.top.slice(0, transform.top.length - 2),
      10
    );

    const newLeft = styleLeft + transformLeft;
    const newTop = styleTop + transformTop;

    this.transformedStyle = {
      left_position: newLeft + "px",
      top_position: newTop + "px"
    };
  };

  // this function is called when the user stops dragging a note
  handleStop = e => {
    // if the user's not clicked on the delete button
    if (e.target.className !== "delete icon") {
      this.deleted = false;

      // take the style properties that were set in the constructor
      let { style } = this;

      // extracts the px transform that the user initiated by moving the note
      let transform = this.extractTransform(this.noteDiv.style.transform);

      // with these transform numbers known, it creates a new style for the note instance
      this.createNewStyle(style, transform);

      // calls the Board component's function to update the note in the API
      this.props.updateNote({
        ...this.transformedStyle,
        id: this.props.id,
        isBoard: this.props.isBoard
      });

      // if the note has been moved, it adds it to the array of moved notes in the state
      if (!this.state.movedNotes.includes(this.props.id)) {
        this.setState({
          movedNotes: [...this.state.movedNotes, this.props.id]
        });
      }
    }
  };

  // since draggable interferes with the natural flow of css, the div has to be focused/selected
  componentDidUpdate() {
    this.focusAndSelect();
  }

  focus = () => {
    this.refs.newText.focus();
  };

  select = () => {
    this.refs.newText.select();
  };

  focusAndSelect = () => {
    this.focus();
    this.select();
  };

  handleClick = e => {
    e.target.focus();
    e.target.select();
  };

  // when the note is edited, the editable state is set to true which allows text to be typed
  handleEdit = e => {
    this.setState({
      editable: true
    });
  };

  // on enter, the note's text is locked, updated, and the new value is represented
  handleKeyPress = e => {
    if (e.key === "Enter") {
      // Persist to database here
      this.updateNote(this.refs.newText.value, this.state.link);
      this.setState({
        editable: false,
        value: this.refs.newText.value
      });
    }
  };

  // updates the note's caption and/or link in the database
  updateNote = (caption, link) => {
    const body = { caption, link };
    api.media.updateMediaContent(body, this.props.id);
  };

  // handles the link modal's opening
  handleOpen = () => this.setState({ modalOpen: true });

  // handles the link modal's closing
  handleClose = () => this.setState({ modalOpen: false });

  // this function is triggered when the add link button is clicked
  addLink = () => {
    this.handleClose();
    // Add link here
    const link = this.linkInput.inputRef.value;
    this.updateNote(this.state.value, link);
    this.setState({ link });
  };

  // this function is triggered when the remove link button is clicked
  handleLinkRemove = () => {
    this.updateNote(this.state.value, "");
    this.setState({ link: "" });
    this.handleClose();
  };

  // this deals with the links on a user's profile board notes
  handleRedirect = () => {
    this.props.getBoard(this.props.id, this.props.history);
  };

  modalLink = () => {
    return (
      <Modal
        trigger={<Icon name="linkify" onClick={this.handleOpen} />}
        size="small"
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Header
          icon="linkify"
          content={
            !!this.state.link
              ? `Change the current link of this resource`
              : `Add a link to your ${this.props.board.subject} board`
          }
        />
        <Modal.Actions>
          <Input
            style={{ paddingTop: "10px" }}
            fluid
            size="small"
            placeholder="Link..."
            ref={input => (this.linkInput = input)}
          />
        </Modal.Actions>
        {!!this.state.link ? (
          <Modal.Content>
            <h4>
              Current Link:{" "}
              <a target="_blank" href={this.state.link}>
                {this.state.link}
              </a>
            </h4>
            <Button onClick={this.handleLinkRemove} basic color="red">
              <Icon name="remove" /> Remove Current Link
            </Button>
          </Modal.Content>
        ) : (
          ""
        )}
        <Modal.Actions>
          <Button onClick={this.handleClose} basic color="red">
            <Icon name="remove" /> Cancel
          </Button>
          <Button onClick={this.addLink} color="green">
            <Icon name="checkmark" /> Add
          </Button>
        </Modal.Actions>
      </Modal>
    );
  };

  render() {
    if (this.state.deleted) {
      this.style = { ...this.style, opacity: "0.0", pointerEvents: "none" };
    }
    return (
      <Draggable onStop={this.handleStop} bounds="parent">
        <div
          className="note"
          onChange={this.handleChange}
          ref={div => (this.noteDiv = div)}
          style={this.style}
        >
          {this.props.isBoard ? (
            ""
          ) : (
            <Icon
              ref={div => (this.deleteButton = div)}
              onClick={this.handleDelete}
              name="delete"
            />
          )}
          {this.props.isBoard ? (
            <Icon name="block layout" style={{ paddingLeft: "5px" }} />
          ) : (
            <Icon name="pencil" onClick={this.handleEdit} />
          )}
          {this.props.isBoard ? "" : this.modalLink()}
          <a
            target={this.props.isBoard ? "" : "_blank"}
            href={
              this.props.isBoard
                ? null
                : !!this.state.link && !this.state.editable
                  ? this.state.link
                  : null
            }
            onClick={this.props.isBoard ? this.handleRedirect : null}
          >
            <textarea
              maxLength="65"
              onClick={this.handleClick}
              onKeyPress={this.handleKeyPress}
              defaultValue={
                this.state.editable ? this.state.value : this.state.value
              }
              disabled={!this.state.editable}
              style={{
                backgroundColor: "rgba(0, 0, 0, 0)",
                borderColor: "rgba(0, 0, 0, 0)",
                outline: "none",
                fontFamily: "Ubuntu",
                fontSize: "20px",
                wrap: "hard",
                height: "100%",
                width: "100%",
                textOverflow: "ellipsis",
                whiteSpace: "wrap",
                textDecoration:
                  !this.state.editable && !!this.state.link ? "underline" : ""
              }}
              ref="newText"
            />
          </a>
        </div>
      </Draggable>
    );
  }
}

const mapStateToProps = state => {
  return {
    board: state.board.currentBoard,
    justFetchedBoard: state.board.justFetchedBoard
  };
};

export default connect(mapStateToProps, actions)(Note);
