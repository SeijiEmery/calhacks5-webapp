import React, { Component } from 'react';

class ResultsPage extends Component {
  render() {
    let data = this.props.result.data;
    let results = {};
    Array.prototype.map.apply(data.concepts, [
      (concept) => { results[concept.name] = concept.value; }
    ]);
    // let message = results["harassment"] > results["safe"] ?
    //   (results["harassment"] > 0.1 ? "Harassment: "+results["harassment"] : ""

    let hc_contrib      = results["harassment"];
    let sc_contrib      = results["safe"];
    let neutral_contrib = Math.max(0, Math.min(1.0,
      1.0 - results["harassment"] + results["safe"]));

    // let rel_hc_contrib      = hc_contrib / (hc_contrib + sc_contrib + neutral_contrib);
    // let rel_sc_contrib      = sc_contrib / (hc_contrib + sc_contrib + neutral_contrib);
    // let rel_neutral_contrib = neutral_contrib / (hc_contrib + sc_contrib + neutral_contrib);
    
    let r = (((Math.min(1.0, hc_contrib + neutral_contrib)) * 255)|0).toString(16);
    let g = (((Math.min(1.0, sc_contrib + neutral_contrib)) * 255)|0).toString(16);
    let b = (((Math.min(1.0, neutral_contrib)) * 255)|0).toString(16);

    if (r.length == 1) r = '0'+r;
    if (g.length == 1) g = '0'+g;
    if (b.length == 1) b = '0'+b;
    let bgcolor = '#'+r+g+b;   // crappy dynamic color
    // hc = "#"+hc+"0000";
    // sc = "#00"+sc+"00";
    return (
      <div class="message-box" style={{'background-color': bgcolor}}>
        <img 
          src={this.props.result.input.data.image.url} 
          alt={"Could not load '"+this.props.result.input.data.image.url+"'"}
          />
        <h3>Harassment Score: {results["harassment"]}</h3>
        <h3>Safety Score: {results["safe"]}</h3>
        {/* <p>id: {this.props.result.id}</p> */}
        {/* <p>created: {this.props.result.created_at}</p> */}
        {/* <h1>Results</h1> */}
        {/* <ul> */}
          {/* {results["harassment"] > 0.1 && <h1 
            class='harass-display' 
            // style={{'background-color': hc }}
            >
            Harassment
            </h1>}
          {results["safe"] > 0.1 && <h1 
            class='harass-display' 
            // style={{'background-color': sc }}
            >
            Safe
            </h1>} */}
        {/* </ul> */}
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
