import React, { Component } from "react";

/* filter component
in:  - the categories to filter
     - the current filter

raise: onGenreChange

*/

class Filter extends Component {
  render() {
    const { genres } = this.props;
    console.log("props: ", this.props.genres);
    return (
      <ul className="list-group">
        <li
          className="list-group-item"
          onClick={() => this.props.onGenreChange("")}
        >
          All Genres
        </li>
        {genres.map(genre => (
          <li
            key={genre._id}
            className="list-group-item"
            onClick={() => this.props.onGenreChange(genre._id)}
          >
            {genre.name}
          </li>
        ))}
      </ul>
    );
  }
}

export default Filter;
