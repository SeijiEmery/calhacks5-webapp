import React, { Component } from 'react';
import './App.css';
import CameraPhotoCapturePage from './components/CameraPhotoCapturePage';
import LoadingPage from './components/LoadingPage';
// import CameraVideoCapturePage from './components/CameraVideoCapturePage';
import ResultsPage from './components/ResultsPage';
import 'whatwg-fetch';
import CloudinaryUploader from './components/CloudinaryUploader';
// import { getSecret } from './secrets';

// const CLOUD_NAME = getSecret("CLOUDIFY_BUCKET_NAME");
const CLOUDIFY_BUCKET_URL = "https://api.cloudinary.com/v1_1/dcflyhc8y/upload";
const CLOUDIFY_UPLOAD_PRESET = "ern5p9sg";
// const CLOUDIFY_BUCKET_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      activePage: "camera",
      captureVideo: false,
      message: null,
      imgdata: null
    };
    this.onImageSubmit = this.onImageSubmit.bind(this);
    this.enableVideo = this.enableVideo.bind(this);
    this.onImageUploadFinished = this.onImageUploadFinished.bind(this);
    this.onImageUploadFailed = this.onImageUploadFailed.bind(this);
    this.returnToFirstPage = this.returnToFirstPage.bind(this);
  }
  returnToFirstPage () { this.setState({ activePage: "camera" }) }
  setLoading() { this.setState({ activePage: "loading" }); }
  setError (msg, err) { this.setState({ activePage: "error-posting", message: ""+ msg + ": " + err }); }
  enableVideo (event) { this.setState({ captureVideo: event.target.checked }); }

  onImageSubmit (dataUri) {
    this.setState({
      activePage: "loading",
      imgdata: dataUri.data
    });
    // uploadFile(dataUri.data);
    // dataUri.data
    // Change page (loading page...)
    // this.setLoading();
    // // Upload image to a server and get URL
    // // Then submit to API, get response, and redirect to next page
    // fetch('/api/images', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ data: "hello world!" })
    // }).then(res => res.json()).then((res) => {
    //   if (!res.success) this.setError("Error posting image: ", res.error.message || res.error);
    //   else this.handleResults(res);
    // });
  }
  onVideoSubmit (stream) {  // note: this probably won't work - this react Camera component wasn't designed for video...
    this.setLoading();
    window.alert(""+stream);
    this.handleResults({ message: "bar" });
  }
  onImageUploadFinished (result) {
    fetch('/api/images', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: result.url })
    }).then(res => res.json()).then((res) => {
      if (!res.success) this.setError("Error posting image: ", res.error.message || res.error);
      else this.handleResults(res);
    });
  }
  onImageUploadFailed (errorStatus) {
    this.setError(`Failed to upload image to '${CLOUDIFY_BUCKET_URL}'`, errorStatus);
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
      case "error-posting": return (
        <div>
          <h1>{this.state.message}</h1>
          <button onClick={this.returnToFirstPage}>Ok</button>
        </div>
      );
      case "ask-for-permission": return (
        <p>Requesting permission...</p>
      );
      case "loading": 
        return (
          <CloudinaryUploader
            url={CLOUDIFY_BUCKET_URL}
            data={this.state.data}
            uploadPreset={CLOUDIFY_UPLOAD_PRESET}
            onUploaded={this.onImageUploadFinished}
            onError={this.onImageUploadFailed} 
          />
        );
      case "loading-": return <LoadingPage />;
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
