import React from "react";
import ReactDOM from "react-dom";

let slidingPuzzle = React.createClass({
  getInitialState () {
    return {
      tiles: [],
      tileValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      emptyValue: 16
    };
  },

  tileClicked(idx) {

  },

  render: function() {
    const tiles = [[]];
    const tileValues = this.state.tileValues;
    const emptyValue = this.state.emptyValue;

    return (
      <div className="main">
        <div className="tilearea">
          { tileValues.map(function (tile, idx){
            return <p
              key={"tile-" + idx}
              className={tile === emptyValue ? "tile-normal" : "tile-empty"}
              onClick={ this.tileClicked.bind(this, idx)}
              >{tile}
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
