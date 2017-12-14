import React, { Component } from "react";
import { api } from "../services/api";
import { connect } from "react-redux";
import * as actions from "../actions/auth";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      error: false,
      fields: {
        username: "",
        password: ""
      }
    };
  }

  handleChange = e => {
    this.setState({
      fields: {
        ...this.state.fields,
        [e.target.name]: e.target.value
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.authenticateUser();
  };

  authenticateUser = () => {
    this.props.signInUser(this.state.fields);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          Username:{" "}
          <input type="text" name="username" onChange={this.handleChange} />
          Password:{" "}
          <input type="text" name="password" onChange={this.handleChange} />
          <button>Login</button>
        </form>
      </div>
    );
  }
}

export default connect(null, actions)(Login);
