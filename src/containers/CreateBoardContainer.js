import React, { Component } from "react";
import { Form, Button, Dropdown, Checkbox } from "semantic-ui-react";

class CreateBoardContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      existingSubject: "",
      newSubject: "",
      newSubjectIsDefault: null
    };
  }
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
    const subjectOptions = [
      { key: "Bitcoin", value: "Bitcoin", text: "Bitcoin" },
      {
        key: "Russia Investigation",
        value: "Russia Investigation",
        text: "Russia Investigation"
      },
      {
        key: "Climate Change",
        value: "Climate Change",
        text: "Climate Change"
      }
    ];
    console.log(this.state);
    return (
      <div>
        <h2>Create a Board</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field inline>
            <label>Find or Create a Subject: </label>
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

export default CreateBoardContainer;
