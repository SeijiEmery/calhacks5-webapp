import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CameraPhotoCapturePage from './components/CameraPhotoCapturePage';
import LoadingPage from './components/LoadingPage';
import CameraVideoCapturePage from './components/CameraVideoCapturePage';
import ResultsPage from './components/ResultsPage';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      activePage: "camera",
      captureVideo: false,
      message: null
    };
    this.onImageSubmit = this.onImageSubmit.bind(this);
    this.enableVideo = this.enableVideo.bind(this);
  }
  returnToFirstPage () { this.setState({ activePage: "camera" }) }
  setLoading() { this.setState({ activePage: "loading" }); }
  enableVideo (event) { this.setState({ captureVideo: event.target.checked }); }

  onImageSubmit (dataUri) {
    // Change page (loading page...)
    this.setLoading();
    // Upload image to a server and get URL
    // Then submit to API, get response, and redirect to next page
    window.alert(""+dataUri);
    this.handleResults({ message: "foo" });
  }
  onVideoSubmit (stream) {  // note: this probably won't work - this react Camera component wasn't designed for video...
    this.setLoading();
    window.alert(""+stream);
    this.handleResults({ message: "bar" });
  }
  handleResults (result) {
    this.setState({
      activePage: "display-results",
      message: result.message 
    });
  }
  confirmAndSubmitResults () {
    window.alert("submitting results!");
    this.returnToFirstPage();
  }
  renderPage () {
    switch (this.state.activePage) {
      case "camera": {
        return (
          <div>
            <CameraPhotoCapturePage onImageSubmit={this.onImageSubmit} />
            {/* {this.captureVideo ?
              <CameraPhotoCapturePage onImageSubmit={this.onImageSubmit} /> :
              <CameraVideoCapturePage onVideoSubmit={this.onVideoSubmit} />} */}
            {/* <input type="checkbox" name="video-checked" checked={this.state.captureVideo} onChange={this.enableVideo} /> */}
          </div>
        );
      }
      case "display-results": return <ResultsPage
        message={this.state.message}
        onConfirm={() => this.confirmAndSubmitResults()}
        onCancel={() => this.returnToFirstPage()} />

      case "ask-for-permission": return (
        <p>Requesting permission...</p>
      );
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
