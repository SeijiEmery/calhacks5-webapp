import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CameraPage from './components/CameraPage';
import LoadingPage from './components/LoadingPage';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      activePage: "camera",
    };
    this.onImageSubmit = this.onImageSubmit.bind(this);
  }
  onImageSubmit (dataUri) {
    // Change page (loading page...)
    this.setState({ activePage: "loading" });

    // Upload image to a server and get URL
    // Then submit to API, get response, and redirect to next page
  }
  renderPage () {
    switch (this.state.activePage) {
      case "camera":  return <CameraPage onImageSubmit={this.onImageSubmit} />;
      case "loading": return <LoadingPage />;
      default: return <h2>Invalid page: {this.state.activePage}</h2>
    }
  }
  render() {
    return (
      <div className="App">
        {this.renderPage()}
      </div>
    );
  }
}

export default App;
