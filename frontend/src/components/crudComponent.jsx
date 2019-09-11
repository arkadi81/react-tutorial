import React, { Component } from "react";

class CRUDtemplate extends Component {
  // goal of this class is to text implementation of conversing with backend, and in longer run, the db, and implement a CRUD intervface
  state = {};
  render() {
    return (
      <React.Fragment>
        <h1>CRUD template here HII</h1>
        <form action="/new" method="POST">
          <input type="text" placeholder="name" name="name" />
          <input type="text" placeholder="quote" name="quote" />
          <button type="submit">Submit</button>
        </form>
      </React.Fragment>
    );
  }
}

export default CRUDtemplate;
// goal of this class is to text implementation of conversing with backend, and in longer run, the db, and implement a CRUD intervface
