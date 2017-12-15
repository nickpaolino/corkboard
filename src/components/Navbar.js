import React, { Component } from "react";
import { Button, Dropdown, Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../actions/auth";

class Navbar extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Menu fluid size="small">
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="Create New Board"
          active={activeItem === "create new board"}
          onClick={this.handleItemClick}
        />
        <Menu.Menu position="left">
          <Dropdown item text="Your Boards">
            <Dropdown.Menu>
              <Dropdown.Item>Bitcoin</Dropdown.Item>
              <Dropdown.Item>Russia Investigation</Dropdown.Item>
              <Dropdown.Item>Climate Change</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
        {this.props.loggedIn ? (
          <Menu.Menu position="right">
            <Menu.Item>Hi, {this.props.user.username}</Menu.Item>
            <Menu.Item>
              <Button fluid onClick={this.props.logoutUser}>
                Logout
              </Button>
            </Menu.Item>
          </Menu.Menu>
        ) : (
          <Menu.Menu position="right">
            <Menu.Item>
              <Link to="/login">
                <Button fluid size={"small"}>
                  Login
                </Button>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/signup">
                <Button fluid size={"small"}>
                  Sign Up
                </Button>
              </Link>
            </Menu.Item>
          </Menu.Menu>
        )}
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.currentUser,
    loggedIn: state.auth.loggedIn
  };
};

export default connect(mapStateToProps, actions)(Navbar);
