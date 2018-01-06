import React, { Component } from "react";
import Draggable from "react-draggable";
import { Icon, Button, Modal, Header, Input } from "semantic-ui-react";
import { connect } from "react-redux";
import { api } from "../../services/api";
import * as actions from "../../actions/boards";
import "../../Board.css";

class Note extends Component {
  constructor(props) {
    super(props);

    this.style = {
      left: this.props.left,
      top: this.props.top
    };

    this.state = {
      deleted: false,
      movedNotes: [],
      editable: !this.props.text,
      value: this.props.text,
      modalOpen: false,
      link: this.props.link
    };
  }

  handleDelete = () => {
    this.setState({
      deleted: true
    });
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

  handleStop = e => {
    if (e.target.className !== "delete icon") {
      this.deleted = false;
      let style = this.style;
      let transform = this.extractTransform(this.noteDiv.style.transform);
      this.createNewStyle(style, transform);
      this.props.updateNote({
        ...this.transformedStyle,
        id: this.props.id,
        isBoard: this.props.isBoard
      });
      if (!this.state.movedNotes.includes(this.props.id)) {
        this.setState({
          movedNotes: [...this.state.movedNotes, this.props.id]
        });
      }
    }
  };

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

  handleEdit = e => {
    this.setState({
      editable: true
    });
  };

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

  updateNote = (caption, link) => {
    const body = { caption, link };
    api.media.updateMediaContent(body, this.props.id);
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  addLink = () => {
    this.handleClose();
    // Add link here
    const link = this.linkInput.inputRef.value;
    this.updateNote(this.state.value, link);
    this.setState({ link });
  };

  handleLinkRemove = () => {
    this.updateNote(this.state.value, "");
    this.setState({ link: "" });
    this.handleClose();
  };

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
