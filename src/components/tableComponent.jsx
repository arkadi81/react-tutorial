import React, { Component } from "react";
import { getTableData } from "../fakedata/fakeTableData"; // ../ for level up
import Pagination from "./common/paginationComponent";

class Table extends Component {
  state = {
    tableData: getTableData(),
    pageSize: 2,
    currentPage: 1
  };

  handleDelete = row => {
    console.log("handleDelete fired", row);
    const newTableData = this.state.tableData.filter(r => r.id !== row.id);
    this.setState({ tableData: newTableData });
  };

  formatTitle = () => {
    const { length: numRowsInTable } = this.state.tableData;
    if (numRowsInTable == 0) return <h1>No rows in table</h1>;
    return <h1>Total of {numRowsInTable} rows in table.</h1>;
  };

  handlePageChange = newPageNumber => {
    console.log(
      "tableComponent - page change fired, page number ",
      newPageNumber
    );
    this.setState({ currentPage: newPageNumber });
  };

  render() {
    const { length: numRowsInTable } = this.state.tableData;
    const { pageSize, currentPage } = this.state;
    console.log("destructured pagesize", pageSize);
    return (
      <React.Fragment>
        {this.formatTitle()}
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.tableData.map(row => (
              <tr key={row.id}>
                {/* DO NOT FORGET KEY HERE*/}
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.age}</td>
                <td>
                  <button
                    onClick={() => this.handleDelete(row)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={numRowsInTable}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
        />
      </React.Fragment>
    );
  }
}

export default Table;
