import React, { Component } from 'react';

class GeolocationDataView extends Component {
  render() {
    if (this.props.geolocation.enabled) {
      const coords = this.props.geolocation.coords;
      return (
        <div>
          <p>Location: {coords.lattitude}, {coords.longitude}</p>
          <p>(accuracy {coords.accuracy})</p>
          <p>timestamp: {""+this.props.geolocation.timestamp}</p>
        </div>
      );
    } else {
      return (
        <div>
          <p>No location data</p>
          <p>timestamp: {""+this.props.geolocation.timestamp}</p>
        </div>
      );
    }
  }
}  
export default GeolocationDataView;
  