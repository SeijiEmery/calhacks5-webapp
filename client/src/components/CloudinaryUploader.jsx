import React, { Component } from 'react';

// Adapted from https://codepen.io/team/Cloudinary/pen/QgpyOK?editors=0010

// https://stackoverflow.com/a/7261048
function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], {type: mimeString});
}


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
        props.onError(""+xhr.readyState + ", " + xhr.status + " => ");
      }
    });
    xhr.upload.addEventListener("progress", onProgressUpdate);
    xhr.onreadystatechange = onReadyStateChange;
    fd.append('upload_preset', props.uploadPreset);
    fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
    fd.append('file', dataURItoBlob(props.data));
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

