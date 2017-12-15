import React, { Component } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { connect } from "react-redux";
import ProfileContainer from "./containers/ProfileContainer";
import { Route, withRouter, Switch } from "react-router-dom";
import * as actions from "./actions/auth";
import Navbar from "./components/Navbar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={ProfileContainer} />} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
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

export default withRouter(connect(mapStateToProps, actions)(App));
