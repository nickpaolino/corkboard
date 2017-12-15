import React, { Component } from "react";
import * as actions from "../actions/auth";
import { connect } from "react-redux";
import withAuth from "../components/hocs/withAuth";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // The Rails backend params accepts a nested user object
      user: {
        username: "",
        password: ""
      }
    };
  }

  handleChange = e => {
    this.setState({
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.createUser();
  };

  createUser = () => {
    this.props.createUser(this.state, this.props.history);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          Username:{" "}
          <input type="text" name="username" onChange={this.handleChange} />
          Password:{" "}
          <input type="text" name="password" onChange={this.handleChange} />
          <button>Sign Up</button>
        </form>
      </div>
    );
  }
}

export default withAuth(connect(null, actions)(Signup));
