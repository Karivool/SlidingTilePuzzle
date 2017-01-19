import React from "react";
import ReactDOM from "react-dom";

let bingoCard = React.createClass({
  getInitialState () {
    return {
    };
  },


  render: function() {
    return (
      <div className="main">
      </div>
    );
  }
});

ReactDOM.render(
  React.createElement(slidingPuzzle),
  document.querySelector("#container")
);
