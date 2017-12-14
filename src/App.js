import React, { Component } from "react";
import Login from "./components/Login";
import { connect } from "react-redux";
import UserPortalContainer from "./containers/UserPortalContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <UserPortalContainer auth={this.props.auth} />
        <Login handleLogin={this.login} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: {
      loggedIn: state.auth.loggedIn,
      user: state.auth.currentUser
    }
  };
};

export default connect(mapStateToProps)(App);
