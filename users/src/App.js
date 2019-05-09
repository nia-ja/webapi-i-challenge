import React, { Component } from 'react';
import axios from "axios";

import UserList from "./components/UserList";

class App extends Component {
  state = {
    users: []
  }
  componentDidMount() {
    axios
      .get("http://localhost:5001/api/users")
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(err => console.log(err));
  }
  deleteUser(id) {
    axios
      .delete(`http://localhost:5001/api/users/${id}`)
      .then(response => {
        const newUsers = this.state.users.filter(user => {
          if(user.id === id) {
            return null
          } else {
            return user
          }
        });
        this.setState({ users: newUsers });
      })
      .catch(err => console.log(err));

  }
  render() {
    return (
      <div className="App">
        <UserList users={this.state.users} deleteUser={this.deleteUser} />
      </div>
    );
  }
}

export default App;
