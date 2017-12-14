import React, { Component } from "react";
import Login from "./components/Login";
import { connect } from "react-redux";
import UserPortalContainer from "./containers/UserPortalContainer";
import { Route, Redirect } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={props => (
            <UserPortalContainer auth={this.props.auth} {...props} />
          )}
        />
        <Route path="/login" component={Login} />
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
