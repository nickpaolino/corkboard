import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../actions/auth";

const withAuth = WrappedComponent => {
  class AuthedComponent extends React.Component {
    state = {
      authCompleted: this.props.loggedIn
    };

    componentDidMount() {
      const token = localStorage.getItem("token");
      if (token) {
        this.props.getCurrentUser(token);
      } else {
        this.setState({ authCompleted: true });
      }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.loggedIn) {
        this.setState({ authCompleted: true });
      }
    }

    render() {
      const isLoginRoute = this.props.history.location.pathname === "/login";
      if (this.state.authCompleted) {
        return this.props.loggedIn ? (
          <div>
            {isLoginRoute ? (
              <Redirect to="/" />
            ) : (
              <WrappedComponent {...this.props} />
            )}
          </div>
        ) : (
          <div>
            {isLoginRoute === "/login" ? (
              <WrappedComponent {...this.props} />
            ) : (
              <Redirect to="/login" />
            )}
          </div>
        );
      } else {
        return null;
      }
    }
  }

  const mapStateToProps = state => ({
    loggedIn: state.auth.loggedIn
  });

  return connect(mapStateToProps, actions)(AuthedComponent);
};

export default withAuth;
