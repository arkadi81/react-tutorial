import React, { Component } from "react";

import Counter from "./counterComponent"; //note the classname is ParcelCase

class ItemsList extends Component {
  // note class name ParcelCase

  /* note = passing data to child component calls via attributes
  the child component will have the info passed through props object

  the inside of the component that's passed here, will be marked up in the child's props as "children"

  is passing child elements great? maybe through props is easier?

  Props vs State
  Props = data given to a component READ ONLY!
  State = data that is local or private to a component

  raising and handling events
  - the component that owns a piece of the state should be the one modifying it
  e.g. if we want to delete an item from a list, the list will be handling the event. single item RAISES the onDelete event
  the list component handles that event using handleDelete

  the single item component raises onDelete and calls it via props
  the list component handles and implements handleDelete

  single source of truth - local state is NOT always necessary

  a component that only relies on props and has no state of its own is called a CONTROLLED COMPONENT
  all data is recieved via props, and it raises events when the data from the parent needs to be changed

  we're bubbling the event up to the parent

  we can also have stateless functional components (only props)

  sfc - stateless functional components (snippet)
  no lifecylce hooks in sfcs - use classes if you need lifecycle hooks

  lifecycle hooks:
  Phases:
  - mount: instance of component is created and inserted into DOM
    constructor, render, componentDidMount
- update: state/props get change
    render, componentDidUpdate
- unmount: component is removed from dom (like deleting counter)
componentWillUnmount

stuff i still need in this website:
db support, server, routing, handling history / back button, mobile first considerations, user/login mgmt, ajax support

  */

  render() {
    const { onReset, onDelete, onIncrement } = this.props; // destructuring
    return (
      <div>
        <button
          className="btn btn-primary btn-sm m-2"
          onClick={this.props.onReset}
        >
          Reset all counters
        </button>
        {this.props.counters.map(counter => (
          <Counter
            key={counter.id}
            onDelete={onDelete}
            onIncrement={onIncrement}
            counter={counter}
          >
            <h1>Counter #{counter.id}</h1>
          </Counter>
        ))}
      </div>
    );
  }
}

export default ItemsList;
