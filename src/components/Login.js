import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/auth";
import withAuth from "../components/hocs/withAuth";
import { Link } from "react-router-dom";
import { Form, Button, Input } from "semantic-ui-react";

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
          <Button>Login</Button>
        </Form>
        <div>
          Not a User? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    );
  }
}

export default withAuth(connect(null, actions)(Login));
