import React, { Component } from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

/* a reusable table component which includes sorting. filter still separate

USAGE:
<Table
        data={movies}
        onSort={onSort}
        sortColumn={sortColumn}
        columns={this.columns}
      />

INTERFACE:
- data - the array of stuff we want to render
- columns - paths and labels for headers and where the stuff we're rendering is. 
columns = [
    { path: ..., label: ..., optional/key: ..., optional/content: <>... },
    
    ...
]
- onSort - event raised on sorting stuff
- SortColumn - the column were sorting by
e.g
handleSort = sortColumn => {
    // console.log(path);
    //algorithm - compare the path with original path - if same, flip sort order. if different, set new path ascending
    this.setState({ sortColumn }); // temp for path to property we're sortig by and order, to be toggled later.
  };

sortColumn: { path: ..., order: "asc/desc" },

*/

const Table = ({ columns, sortColumn, onSort, data }) => {
  //interface
  //   const { columns, sortColumn, onSort, data } = props;
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
