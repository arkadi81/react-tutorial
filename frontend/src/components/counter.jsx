import React, { Component } from "react";

class Counter extends Component {
  // state = {
  //   //value: this.props.counter.value,
  //   imgUrl: "https://picsum.photos/200"
  //   //list: []
  //   // list: ["item1", "item2", "item3"]
  // }; //special property which includes all of the data

  //   constructor() {
  //     super();
  //     //bind event handlers here - one option, not the best option
  //     // another option is to use arrow function: arrow functions dont rebind 'this' - they inherit it
  //     //console.log("in constructor, this = ", this);
  //     this.handleIncrement = this.handleIncrement.bind(this); // this will make sure that no matter how the function is called, this refers to the class
  //   }
  render() {
    // console.log(this.props);

    return (
      <React.Fragment>
        {/* {this.props.children} */}
        <div className="row">
          {/* take up one col */}
          <div className="col-1">
            <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
          </div>
          {/* take up rest of space */}
          <div className="col">
            <button
              onClick={() => this.props.onIncrement(this.props.counter)}
              className="btn btn-secondary btn-sm m-2"
            >
              +
            </button>
            <button
              onClick={() => this.props.onDecrement(this.props.counter)}
              className="btn btn-secondary btn-sm m-2"
              // ideally using a function though
              disabled={this.formatDecrementDisplay(this.props.counter)}
            >
              -
            </button>
            <button
              className="btn btn-danger btn-sm m-2"
              onClick={() => this.props.onDelete(this.props.counter)}
            >
              Delete
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }

  //formatters MUST come after render

  formatDecrementDisplay = counter => {
    return counter.value == 0;
  };
  getBadgeClasses = () => {
    // dynamic class modification
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary"; // append class dynmically depending on value
    return classes;
  };

  formatCount() {
    const { value } = this.props.counter; // this is called destructuring an object - pick out a prop from inside object
    return value === 0 ? "Zero" : value; // jsx expressions automatically get recompiled into js objects
  }
}

export default Counter;
