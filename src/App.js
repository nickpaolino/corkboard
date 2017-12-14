import React, { Component } from "react";
import Login from "./Login";

class App extends Component {
  constructor() {
    super();

    this.state = {
      auth: {
        user: {}
      }
    };
  }

  login = user => {
    // Sets local storage with jwt token
    localStorage.setItem("token", user.jwt);
    // Updates state with the current user
    this.setState({ ...this.state, auth: { user } });
  };

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <Login handleLogin={this.login} />
      </div>
    );
  }
}

export default App;
