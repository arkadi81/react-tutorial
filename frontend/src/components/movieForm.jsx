import React from "react";
import Joi from "joi-browser";
import Form from "./common/form"; // base class, reusable form component
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: 1
    },
    genres: [],
    errors: {} // error messages corresponding to issues with data data
  };

  componentDidMount = () => {
    this.setState({ genres: getGenres() });
    const { id } = this.props.match.params;
    // if we have an id, populate. if not, have a new form going
    if (!id) return;
    // console.log("movie id detected: ", this.props.match.params.id);
    // if we're here, we have an id - get the data and populate:
    const movie = getMovie(id);

    if (!movie) return this.props.history.replace("/not-found"); // in case the id is wrong. we dont need to go to the invalid movie id
    // console.log("movie: ", movie);

    this.setState({ data: this.mapToViewModel(movie) });
  };

  mapToViewModel = movie => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  };
  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number in stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Rate")
  };

  doSubmit = () => {
    // console.log("Submitted");
    // determine if new movie to add or an existing movie to update:

    //the assumption is that the server side logic of saveMovie will determine whether the thing is new or existing and act accordingly
    // const { id } = this.props.match.params;
    //if id truthy, that means we're updating
    // if (!id) {
    // console.log("adding movie: ", this.state.data);
    saveMovie(this.state.data);
    // } else {
    //movie exists, update
    // console.log("updating existing movie: ", this.state.data);
    // }
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie Form - {this.props.match.params.id}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
