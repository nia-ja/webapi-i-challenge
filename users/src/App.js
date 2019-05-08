import React, { Component } from 'react';
import axios from "axios";

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
        {this.state.users.map(user => {
          return (
            <div className="user-wrapper" key={user.id}>
              <p>{user.name}</p>
              <button onClick={() => this.deleteUser(user.id)}>✘</button>
            </div>
          )
        })}
      </div>
    );
  }
}

export default App;
