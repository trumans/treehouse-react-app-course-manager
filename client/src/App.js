import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {}

  call_get_root() {
    console.log("in call_get_root")
    fetch("http://localhost:5000", { method: 'GET' })
        .then(response => response.json())
        .then(data => this.setState({ message: data }))
  }

  render() {
    this.call_get_root()
    return (
      <div className="App">
        <p>
          { "ta-da! " }
          { JSON.stringify(this.state.message) }
        </p>
      </div>
    );
  }
}

export default App;
