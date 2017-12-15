import React, { Component } from "react";
import * as actions from "../actions/auth";
import { connect } from "react-redux";
import withAuth from "../components/hocs/withAuth";
import { Form, Button, Input } from "semantic-ui-react";

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
        <Form onSubmit={this.handleSubmit}>
          <Form.Field inline>
            <label>Username</label>
            <Input
              placeholder="Username"
              name="username"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field inline>
            <label>Password</label>
            <Input
              placeholder="Password"
              name="password"
              type="password"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Button>Sign Up</Button>
        </Form>
      </div>
    );
  }
}

export default withAuth(connect(null, actions)(Signup));
