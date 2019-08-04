import React, { Component } from "react";
// import logo from './logo.svg';
import Table from "./components/tableComponent";
import Navbar from "./components/navbarComponent";
// import ItemsList from "./components/itemsListComponent";

import "./App.css";

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 4 },
      { id: 2, value: 3 },
      { id: 3, value: 0 },
      { id: 4, value: 0 }
    ]
  };

  //example of lifecycle hooks
  constructor(props) {
    super(props);
    console.log("App - constructor fired");
    //this.state = this.props.stuff;
  }

  componentDidMount() {
    //called after component is rendered into the DOM. good place to do ajax calls
    console.log("App - componentDidMount fired");
  }

  componentDidUpdate(prevProps, prevState) {
    //called AFTER component state/props update
    //if (prevProps.stuff !== this.props.stuff) {
    // ajax call to get new data from server, but only if actual update happened
    //}
  }

  componentWillUnmount() {
    // called JUST BEFORE component is removed from DOM
  }

  handleReset = () => {
    console.log("reset handler fired...");
    const counters = this.state.counters.map(c => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };
  handleDelete = counterId => {
    // a method to delete a single counter
    console.log("event handler called", counterId);

    const counters = this.state.counters.filter(c => c.id !== counterId);
    this.setState({ counters });
    //pass a ref to this function via props to the child component
  };

  handleIncrement = counter => {
    console.log("handle increment fired.", counter);
    //above works, but can probably be achieved without cloning
    const counters = [...this.state.counters]; // cloning. called the spread operator
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    this.setState({ counters });
  };

  render() {
    //when a component is rendered, all of its children are rendered recursively.
    console.log("App - render fired");
    return (
      <React.Fragment>
        <Navbar
          totalCounters={this.state.counters.filter(c => c.value > 0).length}
        />
        <main className="container">
          {/*<ItemsList
            onDelete={this.handleDelete}
            onIncrement={this.handleIncrement}
            onReset={this.handleReset}
            counters={this.state.counters}
          />*/}
          <Table />
        </main>
      </React.Fragment>
    );
  }
}
export default App;
