import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CameraPage from './components/CameraPage';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit (dataUri) {
    window.alert("submit: "+dataUri);
  }
  render() {
    return (
      <div className="App">
        <CameraPage onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default App;
