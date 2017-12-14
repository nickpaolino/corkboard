import React, { Component } from "react";
import { connect } from "react-redux";

class UserPortalContainer extends Component {
  render() {
    console.log(this.props);
    return <div />;
  }
}

export default connect()(UserPortalContainer);
