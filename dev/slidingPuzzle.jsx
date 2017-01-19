import React from "react";
import ReactDOM from "react-dom";

let slidingPuzzle = React.createClass({

  getInitialState () {
    let vals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    let tileValues = this.shuffleNum(vals);
    let tileSet = this.setTiles(tileValues);

    return {
      tileSet: tileSet,
      tileValues: tileValues,
      emptyValue: 16,
    };
  },

  setTiles(tileValues) {
    let values = tileValues;
    let tileSet = [];
    let count = [0, 1, 2, 3];

    count.forEach(function(idx) {
      tileSet.push(values.slice(idx * 4, 4 * (idx + 1)));
    }.bind(this));

    return tileSet;
  },

  tileClicked(idx) {

  },

  shuffleNum(vals) {
    for (let idx = vals.length; idx; idx--) {
      let rand = Math.floor(Math.random() * idx);
      [vals[idx - 1], vals[rand]] = [vals[rand], vals[idx - 1]];
    }
    return vals;
  },

  render: function() {
    const tiles = this.state.tileSet;
    const tileValues = this.state.tileValues.concat(16);
    const emptyValue = this.state.emptyValue;

    return (
      <div className="main">
        <div className="tilearea">
          { tileValues.map(function (tile, idx){
            return <p
              key={"tile-" + idx}
              className={tile === emptyValue ? "tile-empty" : "tile-normal"}
              onClick={ this.tileClicked.bind(this, idx)}
              >{tile === emptyValue ? "" : tile}
            </p>
          }.bind(this))
        }
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  React.createElement(slidingPuzzle),
  document.querySelector("#container")
);
