import React, { Component } from "react";
import { Form, Button, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../actions";
import UserList from "../components/create/UserList";
import { api } from "../services/api";

class CreateBoardContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      existingSubject: "",
      newSubject: "",
      newSubjectIsDefault: null,
      subjectOptions: [],
      users: [],
      isPublic: true
    };
  }

  componentDidMount = () => {
    this.props.getUsers();

    if (this.props.subjects) {
      const subjectOptions = this.props.subjects.map(subject => {
        return {
          key: subject,
          value: subject,
          text: subject
        };
        this.setState({ subjectOptions });
      });
    }
  };

  addUser = users => {
    this.setState({ users });
  };

  handleChange = e => {
    let newState;

    if (!!e.target.value) {
      // the new subject is temporarily added to the dropdown
      const newSubjects = [
        ...this.state.subjectOptions,
        {
          key: e.target.value,
          value: e.target.value,
          text: e.target.value
        }
      ];
      newState = {
        newSubject: e.target.value,
        newSubjectIsDefault: true,
        subjectOptions: newSubjects
      };
    } else {
      newState = {
        existingSubject: e.target.innerText,
        newSubjectIsDefault: false
      };
    }
    this.setState(newState);
  };

  handleCheck = (e, { checked }) => {
    this.setState({ isPublic: checked });
  };

  handleSubmit = () => {
    const subject = this.state.newSubjectIsDefault
      ? this.state.newSubject
      : this.state.existingSubject;

    const { isPublic, users } = this.state;

    users.push(this.props.currentUser.username);

    const body = {
      subject,
      public: isPublic,
      users
    };
    // Create board and then fetch the updated list of the user's boards for the Navbar
    this.props
      .createBoard(body, this.props.history)
      .then(() => this.props.getBoards())
      .then(() =>
        api.boards.createBoardPositions(this.props.board.board_users)
      );
    // then create board_user patch requests to submit them as randomly placed on each person's home board
  };

  render() {
    return (
      <div className="new board">
        <h2>Create a Board</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field inline>
            Find or Create a Subject:{" "}
            <Dropdown
              placeholder="Subject"
              search
              selection
              additionPosition="top"
              allowAdditions
              options={this.state.subjectOptions}
              onChange={this.handleChange}
            />{" "}
          </Form.Field>
          <UserList users={this.props.users} addUser={this.addUser} />
          <div className="checkbox" />
          <Button>Create Board</Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    subjects: state.auth.currentUser.subjects,
    users: state.auth.users,
    currentUser: state.auth.currentUser,
    board: state.board.currentBoard
  };
};

export default connect(mapStateToProps, actions)(CreateBoardContainer);
