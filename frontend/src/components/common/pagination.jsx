import React from "react";

/*Interface:
inputs: itemsCount - number of total items
        pageSize - the amount of items on each oage
events: onPageChange(newPageNumber) - raised by this component whenever the page number changeson
output:
*/

// lodash@4.17.10 installed to facilitate the creation of the pages array
//algorithm - using page size and total items create an array of page numbers. map array to bootstrap buttons

const Pagination = props => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize); // so we don't run into floating point issues
  console.log("pagesCount ", pagesCount);
  console.log("current page is: ", currentPage);
  if (pagesCount === 1) return <span>End of data</span>; // dont render pagination if only one page

  // calculate out arrage of page numbers, or use lodash (underscore as alternative);

  //refactor into a function
  let pagesArr = []; // array containing numbers of pages
  console.log("total items", itemsCount);
  console.log("page size ", pageSize);
  for (let i = 1; i < pagesCount + 1; i++) {
    pagesArr.push(i);
  }
  console.log(pagesArr);
  return (
    <React.Fragment>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" onClick={() => props.onPageChange(1)}>
              Previous
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" onClick={() => props.onPageChange(1)}>
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" onClick={() => props.onPageChange(1)}>
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" onClick={() => props.onPageChange(1)}>
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" onClick={() => props.onPageChange(1)}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default Pagination;
