import React, { Component } from 'react';

class ResultsPage extends Component {
  render() {
    let data = this.props.result.data;
    let results = {};
    Array.prototype.map.apply(data.concepts, [
      (concept) => { results[concept.name] = concept.value; }
    ]);

    return (
      <div class="message-box">
        <img 
          src={this.props.result.input.data.image.url} 
          alt={"Could not load '"+this.props.result.input.data.image.url+"'"}
          />
        <p>id: {this.props.result.id}</p>
        <p>created: {this.props.result.created_at}</p>
        <h1>Results</h1>
        <h3>Harassment: {results["harassment"]}</h3>
        <h3>Safe: {results["safe"]}</h3>
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
