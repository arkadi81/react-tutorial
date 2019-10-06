import React, { Component } from "react";

class MovieForm extends Component {
  save = () => {
    this.props.history.push("/movies");
  };

  render() {
    return (
      <React.Fragment>
        <h1>Movie - {this.props.match.params.id}</h1>
        <button type="button" className="btn btn-primary" onClick={this.save}>
          Save
        </button>
      </React.Fragment>
    );
  }
}

export default MovieForm;
