import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import jwtDecode from "jwt-decode";
// import logo from './logo.svg';
// import Table from "./components/tableComponent";
// import CRUDTemplate from "./components/crudComponent";
// import ItemsList from "./components/itemsListComponent";
// import Counter from "./components/counters";
import Navbar from "./components/navbar";
import Movies from "./components/movies";
import Counters from "./components/counters";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 3 },
      { id: 2, value: 2 },
      { id: 3, value: 0 },
      { id: 4, value: 4 }
    ]
  };

  //examples of lifecycle hooks
  constructor() {
    super();
    // called only once, when instance of this class is created.
    // very good spot to initialize the state of the component, say using props.
    //this.state = this.props.stuff; // ONLY IN THE CONSTRUCTOR, WE SET STATE DIRECTLY! NO setState!
    // we wont have access to props unless we pass props to constructor and super
    // console.log("App - constructor fired");
  }

  componentDidMount() {
    //called after component is rendered into the DOM. good place to do ajax calls
    // ajax call -> setState(new data)
    // console.log("App - componentDidMount fired");
    const user = auth.getCurrentUser();
    this.setState({ user });
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

  // handlers here

  handleReset = () => {
    console.log("reset handler fired...");
    const counters = this.state.counters.map(c => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };

  handleIncrement = counter => {
    console.log("handleIncrement fired in counters component", counter);
    const counters = [...this.state.counters];
    // clones the counters array - if we do this, modifying this object will modify the original, which is bad!!
    // find index of the counter we need
    // console.log("counters: ", counters);
    // console.log("counter: ", counter);
    const index = counters.indexOf(counter);
    // console.log(index);
    counters[index] = { ...counter };
    counters[index].value++;
    this.setState({ counters });
  };

  handleDecrement = counter => {
    // console.log("handleDecrement fired in counters component", counter);
    const counters = [...this.state.counters];
    // clones the counters array - if we do this, modifying this object will modify the original, which is bad!!
    // find index of the counter we need
    // console.log("counters: ", counters);
    // console.log("counter: ", counter);
    const index = counters.indexOf(counter);
    // console.log(index);
    counters[index] = { ...counter };
    counters[index].value--;
    this.setState({ counters });
  };

  handleDelete = counter => {
    console.log("handleDelete fired in counters component", counter);
    const counters = this.state.counters.filter(c => c.id !== counter.id);
    this.setState({ counters });
  };

  render() {
    //when a component is rendered, all of its children are rendered recursively.
    // console.log("App - render fired");

    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar
          // only count those greater than 0
          totalCounters={this.state.counters.filter(c => c.value > 0).length}
          user={user}
        />
        <main className="container">
          {/*<ItemsList
            onDelete={this.handleDelete}
            onIncrement={this.handleIncrement}
            onReset={this.handleReset}
            counters={this.state.counters}
          />*/}

          {/* <Counters
            counters={this.state.counters}
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            onDelete={this.handleDelete}
          /> */}
          <Switch>
            {/* <Route path="/movies/new" component={MovieForm} /> */}
            {/* Protected new movie route below */}
            <ProtectedRoute path="/movies/new" component={MovieForm} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />

            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            {/* <Route path="/movies" component={Movies} /> */}
            <Route
              path="/movies"
              render={props => <Movies {...props} user={this.state.user} />}
            />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies"></Redirect>
            {/* <Route path="/" exact component={Movies} /> */}
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}
export default App;
