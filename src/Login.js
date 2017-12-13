import React, { Component } from "react";
import { api } from "./services/api";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.authenticateUser();
  };

  authenticateUser = () => {
    api.auth.login(this.state).then(res => {
      if (res.error) {
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
