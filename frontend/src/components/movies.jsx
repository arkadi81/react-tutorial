import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate"; // remember, named exports
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash"; // to implement sorting
import { deleteMovie } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: {},
    sortColumn: {}
  };

  componentDidMount() {
    //best place to refresh state
    const genres = [{ name: "All Genres", _id: 0 }, ...getGenres()]; // spread and add all genres component. ive added a falsy 0 id so that each item in the list has an id!
    this.setState({
      movies: getMovies(),
      genres,
      sortColumn: { path: "title", order: "asc" },
      selectedGenre: genres[0] // initialize to all genres
    });
  }

  handleDelete = movie => {
    console.log(movie);
    //erase movie with _id as passed
    const filtered = this.state.movies.filter(m => m != movie);
    // returns only elements where id isnt same
    this.setState({ movies: filtered });
    deleteMovie(movie._id);
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

  handleSort = sortColumn => {
    // console.log(path);
    //algorithm - compare the path with original path - if same, flip sort order. if different, set new path ascending
    this.setState({ sortColumn }); // temp for path to property we're sortig by and order, to be toggled later.
  };

  handleNewMovie = () => {
    // console.log("new movie clicked");
    this.props.history.push("/movies/new");
  };

  getPageData = () => {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn
    } = this.state;
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

    return {
      totalCount: filteredMovies.length,
      data: movies
    };
  };

  render() {
    // demonstration of object destructuring. get length out of this.state.movies, rename it to count
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn
    } = this.state;
    if (count == 0) return <div>No movies in database!</div>;

    const result = this.getPageData();
    const { totalCount, data: movies } = result;

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
            <button className="btn btn-primary" onClick={this.handleNewMovie}>
              New Movie
            </button>
            <div>
              Movies Component here! There are {totalCount} movies in the
              database
            </div>
            <MoviesTable
              movies={movies}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
            <Pagination
              itemsCount={totalCount}
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
