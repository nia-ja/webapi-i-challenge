import React, { Component } from 'react';
import axios from "axios";

import UserList from "./components/UserList";
import AddUserForm from './components/AddUserForm';

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
      .then(res => {
        window.location.reload();
      })
      .catch(err => console.log(err));
  }
  addUser(newUser) {
    axios
      .post("http://localhost:5001/api/users", newUser)
      .then(res => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      })
  }
  render() {
    return (
      <div className="App">
        <AddUserForm addUser={this.addUser} />
        <UserList users={this.state.users} deleteUser={this.deleteUser} />
      </div>
    );
  }
}

export default App;
