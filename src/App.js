import React, { Component } from "react";
import Login from "./components/Login";
import { connect } from "react-redux";

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="App">
        <Login handleLogin={this.login} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn,
    user: state.auth.currentUser
  };
};

export default connect(mapStateToProps)(App);
