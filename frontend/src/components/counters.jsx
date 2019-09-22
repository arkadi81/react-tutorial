import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  render() {
    //object destructuring
    const {
      onReset,
      onIncrement,
      onDecrement,
      onDelete,
      counters
    } = this.props;
    return (
      <div>
        <button onClick={onReset} className="btn btn-primary btn-sm m-2">
          Reset
        </button>
        {counters.map(counter => (
          <Counter
            key={counter.id}
            counter={counter}
            onIncrement={onIncrement}
            onDelete={onDelete}
            onDecrement={onDecrement}
          >
            {/* this is where we pass children <h4>Hi</h4>  */}
          </Counter>
        ))}
      </div>
    );
  }
}

export default Counters;
