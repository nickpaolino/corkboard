import React, { Component } from "react";
import { Form, Button, Dropdown, Checkbox } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "../actions/users";

class CreateBoardContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      existingSubject: "",
      newSubject: "",
      newSubjectIsDefault: null
    };
  }

  componentDidMount = () => {
    // Fetch all users
    this.props.getUsers();
  };

  handleChange = e => {
    let newState;

    if (!!e.target.value) {
      newState = {
        newSubject: e.target.value,
        newSubjectIsDefault: true
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
    const subjectOptions = this.props.subjects.map(subject => {
      return {
        key: subject,
        value: subject,
        text: subject
      };
    });

    return (
      <div>
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
              options={subjectOptions}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field inline>
            <Checkbox label="This board is open to the public" defaultChecked />
          </Form.Field>
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
