import React, { Component } from "react";
import { Button, Dropdown, Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: "home"
    };
  }

  handleItemClick = (e, obj) => {
    // Sets the state with the navbar item that is currently selected
    this.setState({ activeItem: obj.name });
  };

  render() {
    const { activeItem } = this.state;
    const { loggedIn, user } = this.props;

    console.log("Rendering with route as ", this.props);
    return (
      <Menu>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={this.handleItemClick}
          disabled={!loggedIn}
          as={Link}
          to="/"
        />
        <Menu.Item
          name="create-new-board"
          active={activeItem === "create-new-board"}
          onClick={this.handleItemClick}
          disabled={!loggedIn}
          as={Link}
          to="/boards/new"
        />
        <Menu.Menu position="left">
          {this.props.user.boards ? (
            <Dropdown disabled={!loggedIn} item text="Your Boards">
              <Dropdown.Menu>
                {this.props.user.boards.map(board => {
                  return <Dropdown.Item>{board.subject}</Dropdown.Item>;
                })}
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            ""
          )}
        </Menu.Menu>
        {loggedIn ? (
          <Menu.Menu position="right">
            <Menu.Item>Hi, {user.username}</Menu.Item>
            <Menu.Item>
              <Link to="/logout">
                <Button>Logout</Button>
              </Link>
            </Menu.Item>
          </Menu.Menu>
        ) : (
          <Menu.Menu position="right">
            <Menu.Item>
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/signup">
                <Button>Signup</Button>
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

export default connect(mapStateToProps)(Navbar);
