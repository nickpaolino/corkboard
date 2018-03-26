import React, { Component } from "react";
import { Login, Logout, Signup, Navbar } from "./components/auth";
import { connect } from "react-redux";
import ProfileContainer from "./containers/ProfileContainer";
import BoardContainer from "./containers/BoardContainer";
import { Route, withRouter, Switch } from "react-router-dom";
import * as actions from "./actions/auth";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* render navbar component with react router's history prop */}
        <Navbar history={this.props.history} />
        <Switch>
          {/* the profile container displays a user's boards and allows them to create a new one */}
          <Route exact path="/" component={ProfileContainer} />} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          {/* the board container is the parent component for the board show and create page */}
          <Route path="/boards" component={BoardContainer} />
          {/* the logout route logs a user out by clearing the redux store */}
          <Route
            path="/logout"
            render={props => {
              return (
                <Logout
                  history={props.history}
                  logoutUser={this.props.logoutUser}
                />
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(null, actions)(App));
