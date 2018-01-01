import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/auth";
import withAuth from "../components/hocs/withAuth";
import { Link } from "react-router-dom";
import { Form, Button, Input } from "semantic-ui-react";
import Draggable from "react-draggable";
import "../login.css";

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

  handleClick = e => {
    e.target.focus();
    e.target.select();
  };

  render() {
    return (
      <div className="boundary">
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
