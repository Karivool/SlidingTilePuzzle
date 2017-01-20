import React from "react";
import ReactDOM from "react-dom";

const GridRef = require('../constants/grid.js');
const SoundFX = require('../constants/sounds.js');

let slidingPuzzle = React.createClass({

  getInitialState () {
    let vals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    let gridAndVals = this.makeSolveableBoard(vals);
    // let tileSet = this.setTiles(tileValues);
    let gridRef = GridRef;

    return {
      tileSet: gridAndVals[0],
      tileValues: gridAndVals[1],
      emptyValue: 16,
      gridRef: gridRef,
      sounds: SoundFX,
    };
  },

  makeSolveableBoard(vals) {
    let grid = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]];
    let posX = 3;
    let posY = 3;
    let idx = 15;
    let shuffleAmt = Math.round(Math.random() * 100 + 400);
    console.log(shuffleAmt);

    for (let times = 0; times < shuffleAmt; times++) {
      let changed = false;
      while (changed === false) {
        let direction = Math.round(Math.random() * 3);
        changed = false;
        if (direction === 0 && grid[posX - 1] !== undefined) {
          // up
          vals[idx] = grid[posX - 1][posY];
          vals[idx - 4] = 16;
          idx -= 4;

          grid[posX][posY] = grid[posX - 1][posY];
          grid[posX - 1][posY] = 16;
          posX -= 1;
          changed = true;
        } else if (direction === 1 && grid[posX + 1] !== undefined) {
          // down
          vals[idx] = grid[posX + 1][posY];
          vals[idx + 4] = 16;
          idx += 4;

          grid[posX][posY] = grid[posX + 1][posY];
          grid[posX + 1][posY] = 16;
          posX += 1;
          changed = true;
        } else if (direction === 2 && grid[posX][posY - 1] !== undefined) {
          // left
          vals[idx] = grid[posX][posY - 1];
          vals[idx - 1] = 16;
          idx -= 1;

          grid[posX][posY] = grid[posX][posY - 1];
          grid[posX][posY - 1] = 16;
          posY -= 1;
          changed = true;
        } else if (direction === 3 && grid[posX][posY + 1] !== undefined) {
          // right
          vals[idx] = grid[posX][posY + 1];
          vals[idx + 1] = 16;
          idx += 1;

          grid[posX][posY] = grid[posX][posY + 1];
          grid[posX][posY + 1] = 16;
          posY += 1;
          changed = true;
        } else {

        }
      }
    }

    return [grid, vals];
  },

  // setTiles(tileValues) {
  //   let values = tileValues;
  //   let tileSet = [];
  //   let count = [0, 1, 2, 3];
  //
  //   count.forEach(function(idx) {
  //     tileSet.push(values.slice(idx * 4, 4 * (idx + 1)));
  //   }.bind(this));
  //
  //   return tileSet;
  // },

  tileClicked(tile, idx) {
    let grid = this.state.tileSet;
    let vals = this.state.tileValues;
    let posX = this.state.gridRef[idx][0];
    let posY = this.state.gridRef[idx][1];

    if (tile === 16) {
      return;
    } else if (grid[posX - 1] !== undefined && grid[posX - 1][posY] === 16) {
      // up
      vals[idx - 4] = tile
      grid[posX - 1][posY] = tile;
    } else if (grid[posX + 1] !== undefined && grid[posX + 1][posY] === 16) {
      // down
      vals[idx + 4] = tile;
      grid[posX + 1][posY] = tile;
    } else if (grid[posX][posY - 1] === 16) {
      // left
      vals[idx - 1] = tile;
      grid[posX][posY - 1] = tile;
    } else if (grid[posX][posY + 1] === 16) {
      // right
      vals[idx + 1] = tile;
      grid[posX][posY + 1] = tile;
    } else {
      return;
    }

    grid[posX][posY] = 16;
    vals[idx] = 16;

    this.setState({
      tileSet: grid,
      tileValues: vals,
    });

    this.playSound();
  },

  playSound() {
    const sounds = this.state.sounds;
    let trackNumber = Math.abs(Math.round(Math.random() * sounds.length - 1));
    let track = sounds[trackNumber];
    let sound = new Audio(track);

    sound.currentTime = 0;
    sound.play();
  },


  render: function() {
    const tiles = this.state.tileSet;
    const tileValues = this.state.tileValues;
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
