import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/auth";
import withAuth from "../hocs/withAuth";
import { Form, Button, Input } from "semantic-ui-react";
import Draggable from "react-draggable";
import "../../login.css";

/* The login component is responsible for producing a form for the user to login
and setting the state in the Redux store if the user's login is successful.
It connects to the Redux store to use signInUser action creator. It's wrapped in
the withAuth hoc so that a logged in user visiting the login page is redirected. */

class Login extends Component {
  state = {
    // the fields state is in the same shape that the action creator expects
    fields: {
      username: "",
      password: ""
    }
  };

  handleChange = e => {
    // when any change is made to a field, update the relevant field in state
    this.setState({
      fields: {
        ...this.state.fields,
        [e.target.name]: e.target.value
      }
    });
  };

  handleSubmit = e => {
    // when the form is submitted, prevent refresh
    e.preventDefault();
    this.authenticateUser();
  };

  authenticateUser = () => {
    // this calls the action creator responsible for authenticating the user
    // via an async request to the backend API to validate the auth
    this.props.signInUser(this.state.fields, this.props.history);
  };

  handleGuestLogin = () => {
    const guestObj = {
      username: "Guest",
      password: "Guest"
    };

    this.props.signInUser(guestObj, this.props.history);
  };

  handleClick = e => {
    // since the Login is a draggable component, this enables focus/select to work
    e.target.focus();
    e.target.select();
  };

  render() {
    return (
      <div className="boundary">
        {/* The draggable component's bounds are the parent div, boundary */}
        <Draggable bounds="parent">
          <div className="login">
            <div className="board">
              <div className="prompt">
                <Form onSubmit={this.handleSubmit}>
                  <Form.Field inline>
                    <h3>
                      <label>Username</label>
                    </h3>
                    <Input
                      placeholder="Username"
                      name="username"
                      onChange={this.handleChange}
                      onClick={this.handleClick}
                    />
                  </Form.Field>
                  <Form.Field inline>
                    <h3>
                      <label>Password</label>
                    </h3>
                    <Input
                      placeholder="Password"
                      name="password"
                      type="password"
                      onChange={this.handleChange}
                      onClick={this.handleClick}
                    />
                  </Form.Field>
                  <Button>Login</Button>
                  <br />
                  <br />
                  <Button onClick={this.handleGuestLogin}>
                    Sign-in as Guest
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </Draggable>
      </div>
    );
  }
}

export default withAuth(connect(null, actions)(Login));
