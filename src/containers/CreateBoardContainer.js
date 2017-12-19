import React, { Component } from "react";
import { Form, Button, Dropdown, Checkbox } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../actions/users";
import UserList from "../components/create/UserList";

class CreateBoardContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      existingSubject: "",
      newSubject: "",
      newSubjectIsDefault: null,
      subjectOptions: []
    };
  }

  componentDidMount = () => {
    // Fetch all users
    this.props.getUsers();

    const subjectOptions = this.props.subjects.map(subject => {
      return {
        key: subject,
        value: subject,
        text: subject
      };
    });

    this.setState({ subjectOptions });
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

  render() {
    const { subjectOptions } = this.state;
    return (
      <div className="new board">
        <h3>Create a Board</h3>
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
          <UserList users={this.props.users} />
          <div className="checkbox">
            <Form.Field inline>
              <Checkbox
                label="This board is open to the public"
                defaultChecked
              />
            </Form.Field>
          </div>
          <Button>Create</Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    subjects: state.auth.currentUser.subjects,
    users: state.auth.users
  };
};

export default connect(mapStateToProps, actions)(CreateBoardContainer);
