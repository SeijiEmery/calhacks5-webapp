import React, { Component } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

class CameraPage extends Component {
  constructor (props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <Camera 
            onTakePhoto={(dataUri) => { this.props.onSubmit(dataUri); }}
        />
      </div>
    );
  }
}

export default CameraPage;
