import React, { Component } from "react";
import * as actions from "../../actions/auth";
import { connect } from "react-redux";
import withAuth from "../../components/hocs/withAuth";
import { Form, Button, Input } from "semantic-ui-react";
import Draggable from "react-draggable";
import "../../login.css";

/* The signup component provides a form for the user to create a new account.
It sets the state in the Redux store if the user's account creation is successful.
It connects to the Redux store to use createUser action creator. It's wrapped in
the withAuth hoc so that a logged in user visiting the sign up page is redirected. */

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      // this double checks the user's password
      passwordConfirmation: "",
      // this sets the input boxes to have a red outline if validations do not work
      passwordValid: true
    };
  }

  handleChange = e => {
    // updates the state fields if any of the input boxes change
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    // prevents the default refresh behavior
    e.preventDefault();
    this.createUser();
  };

  // checks that the password and password confirmation match
  doesPasswordMatch = () =>
    this.state.password === this.state.passwordConfirmation;

  createUser = () => {
    // if the password matches, call the action creator to create user
    if (this.doesPasswordMatch()) {
      const userObj = {
        // the Rails backend params accepts a nested user object
        user: {
          username: this.state.username,
          password: this.state.password
        }
      };
      this.props.createUser(userObj, this.props.history);
    } else {
      // if the password doesn't match, set state to highlight inputs with red
      this.setState({ passwordValid: false });
    }
  };

  handleClick = e => {
    // this remedies the focus/select issues caused by draggable
    e.target.focus();
    e.target.select();
  };

  render() {
    // if the validations are false, show the validation class with a red input box
    const validationsFalse = this.state.passwordValid ? "" : "validation";

    return (
      <div className="boundary">
        <Draggable bounds="parent">
          {/* overwrites the login class's height to extend for the password confirmation */}
          <div className="login" style={{ height: "350px" }}>
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
                      className={validationsFalse}
                    />
                  </Form.Field>
                  <Form.Field inline>
                    <h3>
                      <label>Confirm Password</label>
                    </h3>
                    <Input
                      placeholder="Confirm Password"
                      name="passwordConfirmation"
                      type="password"
                      onChange={this.handleChange}
                      onClick={this.handleClick}
                      className={validationsFalse}
                    />
                  </Form.Field>
                  <Button>Sign Up</Button>
                </Form>
              </div>
            </div>
          </div>
        </Draggable>
      </div>
    );
  }
}

export default withAuth(connect(null, actions)(Signup));
