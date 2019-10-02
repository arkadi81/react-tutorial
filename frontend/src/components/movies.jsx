import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate"; // remember, named exports
import Filter from "./common/filter";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    movies: getMovies(),
    genres: getGenres(),
    pageSize: 4,
    currentPage: 2,
    currentGenreID: ""
  };

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

  handleGenreChange = newGenre => {
    console.log(newGenre);
    this.state.currentGenreID = newGenre;
    if (newGenre !== "") {
      //apply filter
      const filteredMovies = this.state.movies.filter(
        movie => movie.genre._id == newGenre
      );
      console.log("filtered movies: ", filteredMovies);
      this.setState({ movies: filteredMovies });
    } else {
      //unfilter
      const resetMovies = getMovies();
      this.setState({ movies: resetMovies });
    }
  };

  render() {
    // demonstration of object destructuring. get length out of this.state.movies, rename it to count
    const { length: count } = this.state.movies;
    const { movies: allMovies, pageSize, currentPage, genres } = this.state;
    if (count == 0) return <div>No movies in database!</div>;

    const movies = paginate(allMovies, currentPage, pageSize);
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-2">
            <Filter
              genres={genres}
              onGenreChange={this.handleGenreChange}
              currentGenre={1}
            />
          </div>
          <div className="col">
            <div>
              Movies Component here! There are {count} movies in the database
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Rate</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {movies.map(m => (
                  <tr key={m._id}>
                    <td>{m.title}</td>
                    <td>{m.genre.name}</td>
                    <td>{m.numberInStock}</td>
                    <td>{m.dailyRentalRate}</td>
                    <td>
                      <Like
                        liked={m.liked}
                        onClick={() => this.handleLike(m)}
                      />
                    </td>
                    <td>
                      {/* also possible to pass entire m object to handler */}
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => this.handleDelete(m._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              itemsCount={count}
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
