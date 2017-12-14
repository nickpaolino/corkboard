import React, { Component } from "react";
import { api } from "./services/api";

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
    api.auth.login(this.state.fields).then(res => {
      if (!res.error) {
        // If an error is not returned, the login method of the App class is called
        this.props.handleLogin(res);
      } else {
        // Error messages
      }
    });
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

export default Login;
