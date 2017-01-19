import React from "react";
import ReactDOM from "react-dom";

let slidingPuzzle = React.createClass({

  getInitialState () {
    let vals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    let tileValues = this.shuffleNum(vals);
    let tileSet = this.setTiles(tileValues);

    return {
      tileSet: this.tileSet,
      tileValues: this.tileValues,
      emptyValue: null
    };
  },

  setTiles(tileValues) {
    let values = tileValues;
    let tileSet = [[],[],[],[]];

    tileSet.forEach(function(tile) {
      debugger
    }.bind(values));
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
    const tiles = this.state.tiles;
    const tileValues = this.state.tileValues;
    const emptyValue = this.state.emptyValue;

    return (
      <div className="main">
        <div className="tilearea">
          { tiles.map(function (row, idx){
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
