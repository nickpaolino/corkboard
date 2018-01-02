import React, { Component } from "react";
import { Dropdown, Grid } from "semantic-ui-react";

class UserList extends Component {
  state = {
    multiple: true,
    search: true,
    searchQuery: null,
    value: [],
    options: []
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.isModal) {
      this.getUsers(nextProps.users);
    }
  }

  componentDidMount() {
    if (this.props.isModal && !!this.props.users.length) {
      this.getUsers(this.props.users);
    }
  }

  getUsers = users => {
    let options;

    if (!this.props.isModal) {
      options = users.map(user => {
        return {
          key: user.username,
          text: user.username,
          value: user.username
        };
      });
    } else {
      options = users.map(user => {
        return {
          key: user,
          text: user,
          value: user
        };
      });
    }
    this.setState({ options });
  };

  handleChange = (e, obj) => {
    this.setState({ value: obj.value });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.value.length !== prevState.value.length) {
      this.props.addUser(this.state.value);
    }
  }

  handleSearchChange = (e, obj) => {
    this.setState({ searchQuery: obj.searchQuery });
  };

  render() {
    const { multiple, options, search } = this.state;
    return (
      <Grid>
        <Grid.Column width={this.props.isModal ? 15 : 10}>
          <Dropdown
            fluid
            selection
            multiple={multiple}
            search={search}
            options={options}
            placeholder="Add Users"
            noResultsMessage="No Users Found"
            onChange={this.handleChange}
            onSearchChange={this.handleSearchChange}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserList;
