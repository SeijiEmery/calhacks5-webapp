import React, { Component } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

class CameraPhotoCapturePage extends Component {
  render() {
    return (
      <div className="App">
        <Camera 
            idealFacingMode="environment"
            // idealResolution={{width: 1920, height: 1080}}   // change this as desired. Resolution is not forced, just recommended
            sizeFactor={1.0}          // scaling factor - can use this or ideal resolution
            imageType={"png"}         // "png" or "jpg"
            imageCompression={0.92}   // min = 0, max = 1, default = 0.92
            onTakePhoto={(dataUri) => { this.props.onImageSubmit(dataUri); }}
        />
      </div>
    );
  }
}

export default CameraPhotoCapturePage;
