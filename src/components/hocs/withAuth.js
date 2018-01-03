import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../actions/auth";

// withAuth is a higher order component that checks if a user is logged in and redirects when appropriate
const withAuth = WrappedComponent => {
  class AuthedComponent extends React.Component {
    state = {
      // the auth process is complete if a user is logged in
      authCompleted: this.props.loggedIn
    };

    componentDidMount() {
      const token = localStorage.getItem("token");
      if (token && token !== "undefined") {
        // If token exists then get the current user
        this.props.getCurrentUser(token);
      } else {
        // If the token doesn't exist, then the user isn't logged in
        this.setState({ authCompleted: true });
      }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.loggedIn) {
        // if the next props to be received shows that the user is logged in, auth is complete
        this.setState({ authCompleted: true });
      }
    }

    render() {
      // boolean to check if the current url is for the login or signup
      const isLoginOrSignupRoute =
        this.props.history.location.pathname === "/login" ||
        this.props.history.location.pathname === "/signup";

      // if auth is complete, return wrapped component or redirect user
      if (this.state.authCompleted) {
        return this.props.loggedIn ? (
          <div>
            {/* the user is logged in and we're on the login/signup route - redirect to user home */}
            {isLoginOrSignupRoute ? (
              <Redirect to="/" />
            ) : (
              <WrappedComponent {...this.props} />
            )}
            {/* the user is logged in and we're not on the login/signup route - return the wrapped component */}
          </div>
        ) : (
          <div>
            {/* the user is not logged in and we're not on the login/signup route - redirect to login/signup route */}
            {isLoginOrSignupRoute ? (
              <WrappedComponent {...this.props} />
            ) : (
              <Redirect to="/login" />
            )}
            {/* the user is not logged in and we're not on the login/signup route - redirect to login */}
          </div>
        );
      } else {
        // if the auth isn't completed, return null until it's finished
        return null;
      }
    }
  }

  const mapStateToProps = state => ({
    // read whether the user is logged in from the redux state
    loggedIn: state.auth.loggedIn
  });

  return connect(mapStateToProps, actions)(AuthedComponent);
};

export default withAuth;
