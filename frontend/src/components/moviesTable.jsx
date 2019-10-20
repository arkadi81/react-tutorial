import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";
import auth from "../services/authService";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      )
    }, // for like and delete buttons, no need to sort or display, just render the cols.
    {
      key: "delete",
      content: movie =>
        auth.getCurrentUser() &&
        auth.getCurrentUser().isAdmin && (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => this.props.onDelete(movie)}
          >
            Delete
          </button>
        )
    }
  ]; // does not need to be part of state - we're not changing it.
  render() {
    const { movies, onSort, sortColumn } = this.props; // note, no this.
    return (
      <Table
        data={movies}
        onSort={onSort}
        sortColumn={sortColumn}
        columns={this.columns}
      />

      //   <table className="table">
      //     <TableHeader
      //       columns={this.columns}
      //       sortColumn={sortColumn}
      //       onSort={onSort}
      //     />
      //     <TableBody data={movies} columns={this.columns} />
      //   </table>
    );
  }
}

export default MoviesTable;
