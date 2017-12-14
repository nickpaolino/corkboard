import React, { Component } from "react";
import Login from "./components/Login";
import { connect } from "react-redux";
import CorkboardContainer from "./containers/CorkboardContainer";
import { Route, withRouter } from "react-router-dom";

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={props => (
            <CorkboardContainer auth={this.props.auth} {...props} />
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

export default withRouter(connect(mapStateToProps)(App));
