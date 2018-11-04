import React, { Component } from 'react';

// Adapted from https://codepen.io/team/Cloudinary/pen/QgpyOK?editors=0010

class CloudinaryUploader extends Component {
  constructor (props) {
    super(props);
    var xhr = new XMLHttpRequest();
    var fd = new FormData();
    xhr.open('POST', props.url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    this.state = { progress: 0.0 };
    const onProgressUpdate = ((e) => {
      let progress = Math.round(e.loaded / e.total);
      this.setState({ progress: progress });
    });
    const onReadyStateChange = ((e) => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // File uploaded successfully
        var response = JSON.parse(xhr.responseText);
        var url = response.secure_url;
        // Create a thumbnail of the uploaded image, with 150px width
        var tokens = url.split('/');
        tokens.splice(-2, 0, 'w_150,c_scale');
        let src = tokens.join('/');
        let alt = response.public_id;
        props.onUploaded({ src: src, alt: alt });
      } else if (xhr.readyState === 4 && xhr.status !== 200) {
        props.onError(xhr.status);
      }
    });
    xhr.upload.addEventListener("progress", onProgressUpdate);
    xhr.onreadystatechange = onReadyStateChange;
    fd.append('upload_preset', props.uploadPreset);
    fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
    fd.append('file', props.data);
    xhr.send(fd);
  }
  render () {
    return (
      <div>
        <h1>Uploading file: {this.state.progress * 100}%...</h1>
      </div>
    );
  }
}
export default CloudinaryUploader;

// // *********** Upload file to Cloudinary ******************** //
// function uploadFile(file) {
//     var url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
//     var xhr = new XMLHttpRequest();
//     var fd = new FormData();
//     xhr.open('POST', url, true);
//     // Reset the upload progress bar
//      document.getElementById('progress').style.width = 0;
    
//     // Update progress (can be used to show progress indicator)
//     xhr.upload.addEventListener("progress", function(e) {
//       var progress = Math.round((e.loaded * 100.0) / e.total);
//       document.getElementById('progress').style.width = progress + "%";
  
//       console.log(`fileuploadprogress data.loaded: ${e.loaded},
//     data.total: ${e.total}`);
//     });
  
//     xhr.onreadystatechange = function(e) {
//       if (xhr.readyState == 4 && xhr.status == 200) {
//         // File uploaded successfully
//         var response = JSON.parse(xhr.responseText);
//         var url = response.secure_url;
//         // Create a thumbnail of the uploaded image, with 150px width
//         var tokens = url.split('/');
//         tokens.splice(-2, 0, 'w_150,c_scale');
//         var img = new Image(); // HTML5 Constructor
//         img.src = tokens.join('/');
//         img.alt = response.public_id;
//         document.getElementById('gallery').appendChild(img);
//       }
//     };
  
    
//   }

