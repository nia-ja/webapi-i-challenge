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
        console.log(response);
        this.setState({ users: response.data });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="App">
        {this.state.users.map(user => {
          return <p key={user.id}>{user.name}</p>
        })}
      </div>
    );
  }
}

export default App;
