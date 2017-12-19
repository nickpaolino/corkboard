import _ from "lodash";
import React, { Component } from "react";
import { Button, Dropdown, Grid, Header } from "semantic-ui-react";

class UserList extends Component {
  state = {
    multiple: true,
    search: true,
    searchQuery: null,
    value: [],
    options: []
  };

  componentWillReceiveProps(nextProps) {
    this.getUsers(nextProps.users);
  }

  getUsers = users => {
    const options = users.map(user => {
      return {
        key: user.username,
        text: user.username,
        value: user.username
      };
    });

    this.setState({ options });
  };

  handleChange = (e, obj) => {
    this.setState({ value: obj.value });
  };

  handleSearchChange = (e, obj) => {
    this.setState({ searchQuery: obj.searchQuery });
  };

  toggleSearch = e => this.setState({ search: e.target.checked });

  render() {
    const { multiple, options, search, value } = this.state;

    return (
      <Grid>
        <Grid.Column width={8}>
          <Dropdown
            fluid
            selection
            multiple={multiple}
            search={search}
            options={options}
            value={value}
            placeholder="Add Users"
            onChange={this.handleChange}
            onSearchChange={this.handleSearchChange}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserList;
