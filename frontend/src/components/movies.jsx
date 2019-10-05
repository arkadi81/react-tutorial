import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate"; // remember, named exports
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash"; // to implement sorting

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: "",
    sortColumn: {}
  };

  componentDidMount() {
    //best place to refresh state
    const genres = [{ name: "All Genres", _id: 0 }, ...getGenres()]; // spread and add all genres component. ive added a falsy 0 id so that each item in the list has an id!
    this.setState({
      movies: getMovies(),
      genres,
      sortColumn: { path: "title", order: "asc" }
    });
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

  handleSort = path => {
    // console.log(path);
    //algorithm - compare the path with original path - if same, flip sort order. if different, set new path ascending
    const sortColumn = { ...this.state.sortColumn };
    if (sortColumn.path === path) {
      // change sort order
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.setState({ sortColumn }); // temp for path to property we're sortig by and order, to be toggled later.
  };

  render() {
    // demonstration of object destructuring. get length out of this.state.movies, rename it to count
    const { length: count } = this.state.movies;
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn
    } = this.state;
    if (count == 0) return <div>No movies in database!</div>;

    // filter the movies before paginating - number of pages depends on filter

    const filteredMovies =
      selectedGenre.name && selectedGenre._id // if both truthy, apply filter - otherwise display all
        ? allMovies.filter(movie => movie.genre._id === selectedGenre._id)
        : allMovies;

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sortedMovies, currentPage, pageSize);

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
              onSort={this.handleSort}
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
