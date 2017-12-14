import React, { Component } from "react";
import Login from "./components/Login";
import { connect } from "react-redux";
import { api } from "./services/api";
import CorkboardContainer from "./containers/CorkboardContainer";
import { Route, withRouter, Switch } from "react-router-dom";
import * as actions from "./actions/auth";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <CorkboardContainer auth={this.props.auth} {...props} />
            )}
          />
          <Route path="/login" component={Login} />
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
