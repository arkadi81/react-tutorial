import React, { Component } from "react";

/*since jsx expressions get compiled to react elements, some keywords inside jsx are a bit different
use className instead of class attribute

badge badge-primary is bootstrap stuff
m-2 = margin 2

applying styling inline: style={this.styles}. styles should have css properties in camelCase
e.g. styles = { fontSize = 10, fontWeight = 'bald'}
note if truly inline, double curly braces happen - this is never advised anyways.

dynamic rendering of classes

communication between components?

jsx is not a templating engine - just syntax, no loops , if/else etc.
for conditional rendering, use plain js

when applying dynamic stuff, use {}

list items should have unique keys

conditional rendering also can be achieved by injecting into jsx: (logical statement && 'what to display')
reminder: JS will evaluate A && 'string' as follows: if A true, then 'non empty string' is truthy, hence displayed
any number but 0 is truthy
any non empty string is truthy

more js intricacies:
this refers to different things depending on how function is called.
- when function is called as obj.method(), this refers to obj
- function() - this = window (or if strict mode is enabled, it will this == undefined)

refactoring: ctrl/shift/R

handling events: 1 - case sensitive!! 2- dont call the function - only pass reference (no ())
- when we need to pass arguments to ui driven events, use arrow function notation {() => func(arg)}

Next up - 
composing components to build a multicomponent app
passing data between components
raise and handle events
make multiple components be in sync
functional components
lifecycle hooks



*/
class Counter extends Component {
  state = {
    //value: this.props.counter.value,
    imgUrl: "https://picsum.photos/200",
    //list: []
    list: ["item1", "item2", "item3"]
  }; //special property which includes all of the data

  //   constructor() {
  //     super();
  //     //bind event handlers here - one option, not the best option
  //     // another option is to use arrow function: arrow functions dont rebind 'this' - they inherit it
  //     //console.log("in constructor, this = ", this);
  //     this.handleIncrement = this.handleIncrement.bind(this); // this will make sure that no matter how the function is called, this refers to the class
  //   }
  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <h1>hi hallo</h1>
        {this.props.children}
        <button
          onClick={() => this.props.onIncrement(this.props.counter)}
          className="btn btn-secondary btn-sm"
        >
          Increcment
        </button>
        <button
          className="btn btn-danger btn-sm m-2"
          onClick={() => this.props.onDelete(this.props.counter.id)}
        >
          Delete
        </button>
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <img src={this.state.imgUrl} alt="" />
        <div>this is a list!</div>
        {this.renderListItems()}
      </React.Fragment>
    );
  }

  handleIncrement = () => {
    //is actually handled on the itemslist end

    // note, arrow functions DO NOT REBIND THIS - THEY INHERIT IT
    // if we use regular function, we need to use constructor to get access to this.
    //console.log("increment clicked", this.state.count);
    // this.state.count++; // not going to work - in react we cannot update state directly
    this.setState({
      value: this.state.value + 1 // properties passsed here will be merged or overwrite the state var in the class
    });
  };

  renderListItems() {
    if (this.state.list.length === 0)
      return <p>There are no items in the list</p>;

    return (
      <ul>
        {this.state.list.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }

  getBadgeClasses() {
    // dynamic class modification
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary"; // append class dynmically depending on value
    return classes;
  }

  formatCount() {
    const { value } = this.props.counter; // this is called destructuring an object - pick out a prop from inside object
    return <h1>{value === 0 ? "Zero" : value}</h1>; // jsx expressions automatically get recompiled into js objects
  }
}

export default Counter;
