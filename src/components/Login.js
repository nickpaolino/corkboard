import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/auth";
import withAuth from "../components/hocs/withAuth";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    this.props.signInUser(this.state.fields, this.props.history);
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
        <div>
          Not a User? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    );
  }
}

export default withAuth(connect(null, actions)(Login));
