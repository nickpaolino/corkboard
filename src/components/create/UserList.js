import _ from "lodash";
import React, { Component } from "react";
import { Button, Dropdown, Grid, Header } from "semantic-ui-react";

const getOptions = () => {
  return [
    {
      key: "Nick",
      text: "Nick",
      value: "Nick"
    },
    {
      key: "Ramy",
      text: "Ramy",
      value: "Ramy"
    }
  ];
};

class UserList extends Component {
  componentWillMount() {
    this.setState({
      multiple: true,
      search: true,
      searchQuery: null,
      value: [],
      options: getOptions()
    });
  }

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
