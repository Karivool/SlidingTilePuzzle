import React from "react";
import ReactDOM from "react-dom";

const GridRef = require('../constants/grid.js');

let slidingPuzzle = React.createClass({

  getInitialState () {
    let vals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    let tileValues = this.shuffleNum(vals);
    let tileSet = this.setTiles(tileValues);
    let gridRef = GridRef;

    return {
      tileSet: tileSet,
      tileValues: tileValues,
      emptyValue: 16,
      gridRef: gridRef,
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

  tileClicked(tile, idx) {
    let grid = this.state.tileSet;
    let posX = this.state.gridRef[idx][0];
    let posY = this.state.gridRef[idx][1];

    debugger
    if (tile === 16) {
      return;
    } else if (grid[posX - 1][posY] === 16) {
      // up
       
    } else if (grid[posX + 1][posY] === 16) {
      // down

    } else if (grid[posX][posY - 1] === 16) {
      // left

    } else if (grid[posX][posY + 1] === 16) {
      // right

    }
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
              onClick={ this.tileClicked.bind(this, tile, idx)}
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
