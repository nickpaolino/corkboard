import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";

class CreateBoardContainer extends Component {
  render() {
    const subjectOptions = [
      { key: 1, value: "Bitcoin", text: "Bitcoin" },
      {
        key: 2,
        value: "Russia Investigation",
        text: "Russia Investigation"
      },
      {
        key: 3,
        value: "Climate Change",
        text: "Climate Change"
      }
    ];
    return (
      <div>
        <h2>Create a Board</h2>
        <label>Subject: </label>
        <Dropdown
          placeholder="Subject"
          search
          selection
          options={subjectOptions}
        />
      </div>
    );
  }
}

export default CreateBoardContainer;
