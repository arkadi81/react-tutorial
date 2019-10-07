import React, { Component } from "react";
import _ from "lodash";

/* search component. recieves list, on change filters list based on given field and search param

INTERFACE:
    - path: string - the path to the state variable bound to the search box
    - 
    - fields: array of paths to check in TODO
    - raises onChange event

*/

const SearchBox = ({ value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor="searchBox">Search</label>
      <input
        className="form-control my-3"
        placeholder="Search..."
        id="searchBox"
        value={value}
        onChange={e => onChange(e.currentTarget.value)}
      />
    </div>
  );
};

export default SearchBox;
