import React, { Component } from 'react';

class ResultsPage extends Component {
  constructor (props) {
    super(props);
  }
  render() {
    return (
      <div class="message-box">
        <h1>Results</h1>
        <p>{this.props.message}</p>
        <h1>Confirm?</h1>
        <div class="h-span">
            <button onClick={this.props.onConfirm}>confirm</button>
            <button onClick={this.props.onCancel}>cancel</button>
        </div>
      </div>
    );
  }
}

export default ResultsPage;
