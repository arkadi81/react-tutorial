import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate"; // remember, named exports
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: ""
  };

  componentDidMount() {
    //best place to refresh state
    const genres = [{ name: "All Genres" }, ...getGenres()]; // spread and add all genres component. no _id needed for this one
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = _id => {
    console.log(_id);
    //erase movie with _id as passed
    const filtered = this.state.movies.filter(m => m._id != _id); // returns only elements where id isnt same
    this.setState({ movies: filtered });
  };

  handleLike = movie => {
    console.log("like clicked: ", movie);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = newPageNumber => {
    //raised when a pagination element is clicked and page is changed
    // console.log(newPageNumber);
    this.setState({ currentPage: newPageNumber });
  };

  handleGenreSelect = genre => {
    //set state to genre
    // console.log(genre);
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  render() {
    // demonstration of object destructuring. get length out of this.state.movies, rename it to count
    const { length: count } = this.state.movies;
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      genres,
      selectedGenre
    } = this.state;
    if (count == 0) return <div>No movies in database!</div>;

    // filter the movies before paginating - number of pages depends on filter

    const filteredMovies =
      selectedGenre.name && selectedGenre._id // if both truthy, apply filter - otherwise display all
        ? allMovies.filter(movie => movie.genre._id === selectedGenre._id)
        : allMovies;

    const movies = paginate(filteredMovies, currentPage, pageSize);

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={genres}
              // textProperty="name" - now replaced by default props
              // valueProperty="_id"
              onItemSelect={this.handleGenreSelect}
              selectedItem={selectedGenre}
            />
          </div>
          <div className="col">
            <div>
              Movies Component here! There are {filteredMovies.length} movies in
              the database
            </div>
            <MoviesTable
              movies={movies}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
            />
            <Pagination
              itemsCount={filteredMovies.length}
              pageSize={this.state.pageSize}
              onPageChange={this.handlePageChange}
              currentPage={this.state.currentPage}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
