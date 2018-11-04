import React, { Component } from 'react';

class ResultsPage extends Component {
  render() {
    let data = this.props.result.data;
    let results = {};
    Array.prototype.map.apply(data.concepts, [
      (concept) => { results[concept.name] = concept.value; }
    ]);

    let hc = ((results["harassment"] * 255)|0).toString(16);
    let sc = ((results["safe"] * 255)&255).toString(16);
    if (hc.length == 1) hc = '0'+hc;
    if (sc.length == 1) sc = '0'+sc;
    hc = "#"+hc+"0000";
    sc = "#00"+sc+"00";
    return (
      <div class="message-box">
        <img 
          src={this.props.result.input.data.image.url} 
          alt={"Could not load '"+this.props.result.input.data.image.url+"'"}
          />
        <p>id: {this.props.result.id}</p>
        <p>created: {this.props.result.created_at}</p>
        <h1>Results</h1>
        <ul>
          {results["harassment"] > 0.1 && <li class='harass-display' style={{'background-color': hc }}>Harassment</li>}
          {results["safe"] > 0.1 && <li class='harass-display' style={{'background-color': sc }}>Safe</li>}
        </ul>
        {/* <h3>Harassment: {results["harassment"]}</h3>
        <h3>Safe: {results["safe"]}</h3> */}
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
