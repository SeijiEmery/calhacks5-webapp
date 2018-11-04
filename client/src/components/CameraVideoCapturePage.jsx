import React, { Component } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

class CameraVideoCapturePage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      stream: null
    };
    this.startRecordingVideo = this.startRecordingVideo.bind(this);
    this.stopRecordingVideo = this.stopRecordingVideo.bind(this);
  }
  startRecordingVideo (stream) {
    this.setState({ stream: stream });
  }
  stopRecordingVideo () {
    let stream = this.state.stream;
    this.setState({ stream: null });
    if (stream) {
      this.props.onVideoSubmit(stream);
    }
  }
  render() {
    return (
      <div className="App">
        <Camera 
            idealFacingMode="environment"
            // idealResolution={{width: 1920, height: 1080}}   // change this as desired. Resolution is not forced, just recommended
            sizeFactor={1.0}          // scaling factor - can use this or ideal resolution
            imageType={"png"}         // "png" or "jpg"
            imageCompression={0.92}   // min = 0, max = 1, default = 0.92
            onCameraStart = {this.startRecordingVideo}
            onCameraStop  = {this.stopRecordingVideo}
        />
      </div>
    );
  }
}

export default CameraVideoCapturePage;
