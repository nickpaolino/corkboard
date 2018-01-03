import React, { Component } from "react";
import { Button, Dropdown, Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions/boards";

class Navbar extends Component {
  handleDropdownClick = e => {
    // this takes the board id from the id of the clicked dropdown item
    const clickedBoardId = e.target.id;

    // this takes the board id from the current url
    const currentBoardId = this.props.history.location.pathname.split("/")[2];

    // if the clicked item isn't the same as the current board, then dispatch action to get board
    if (clickedBoardId !== currentBoardId) {
      this.props.getBoard(e.target.id, this.props.history);
    }
  };

  handleLogoClick = () => {
    this.props.history.push("/");
  };

  render() {
    const { loggedIn, user } = this.props;

    return (
      <Menu className="navbar">
        <Menu.Item className="logo" onClick={this.handleLogoClick}>
          corkboard
        </Menu.Item>
        {loggedIn ? (
          <Menu.Item
            name="all boards"
            onClick={this.handleItemClick}
            disabled={!loggedIn}
            as={Link}
            to="/"
          />
        ) : (
          ""
        )}
        <Menu.Menu position="left">
          {this.props.user.boards ? (
            <Dropdown disabled={!loggedIn} item text="Your Boards">
              <Dropdown.Menu>
                {this.props.user.boards.map(board => {
                  return (
                    <Dropdown.Item
                      key={board.id}
                      id={board.id}
                      onClick={this.handleDropdownClick}
                    >
                      {board.subject}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            ""
          )}
        </Menu.Menu>
        {loggedIn ? (
          <Menu.Menu style={{ fontFamily: "Ubuntu" }} position="right">
            <Menu.Item>Hi, {user.username}</Menu.Item>
            <Menu.Item>
              <Link to="/logout">
                <Button>Logout</Button>
              </Link>
            </Menu.Item>
          </Menu.Menu>
        ) : (
          <Menu.Menu style={{ fontFamily: "Ubuntu" }} position="right">
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

export default connect(mapStateToProps, actions)(Navbar);
