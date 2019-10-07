import React, { Component } from "react";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate"; // remember, named exports
import ListGroup from "./common/listGroup";
// import { getGenres } from "../services/fakeGenreService";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable";
import _ from "lodash"; // to implement sorting
// import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getMovies, deleteMovie } from "../services/movieService";
import SearchBox from "./common/searchBox";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: {},
    sortColumn: { path: "title", order: "asc" },
    searchQuery: ""
  };

  async componentDidMount() {
    //best place to refresh state
    const { data } = await getGenres(); // note - async things return promises, must be awaited!
    const genres = [{ name: "All Genres", _id: 0 }, ...data]; // spread and add all genres component. ive added a falsy 0 id so that each item in the list has an id!
    // const genres = [{ name: "All Genres", _id: 0 }, ...backendGenres];
    const { data: movies } = await getMovies();

    this.setState({
      movies,
      genres,
      sortColumn: { path: "title", order: "asc" },
      selectedGenre: genres[0] // initialize to all genres
    });
  }

  handleDelete = async movie => {
    const originalMovies = this.state.movies; // keep old version in case of failure
    //erase movie with _id as passed
    const filtered = originalMovies.filter(m => m != movie);
    // returns only elements where id isnt same

    //optimistic update
    this.setState({ movies: filtered });
    try {
      await deleteMovie(movie._id);
    } catch (exception) {
      if (exception.response && exception.response.status === 404) {
        toast("This movie has already been deleted."); // catch EXPECTED error here

        this.setState({ movies: originalMovies });
      }
    }
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
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" }); // controlled components CANNOT BE NULL OR UNDEF
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

  handleSearch = query => {
    // console.log(input.value);
    this.setState({ searchQuery: query, selectedGenre: {}, currentPage: 1 });
  };

  getPageData = () => {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      searchQuery
    } = this.state;

    //FILTERING
    // good place to handle search. check if search field is truthy - if so, filter by search field. if not, filter by genres
    let filteredMovies = [];
    if (searchQuery) {
      // console.log("will filter by search");
      filteredMovies = allMovies.filter(
        movie => movie.title.match(new RegExp(searchQuery, "i")) // regex works
      );
    } else {
      filteredMovies =
        selectedGenre.name && selectedGenre._id // if both truthy, apply filter - otherwise display all
          ? allMovies.filter(movie => movie.genre._id === selectedGenre._id)
          : allMovies;
    }

    //SORTING
    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    //PAGINATION
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
            <SearchBox
              onChange={this.handleSearch}
              value={this.state.searchQuery}
            />
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
