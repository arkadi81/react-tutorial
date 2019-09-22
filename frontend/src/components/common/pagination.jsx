import React from "react";

/*Interface:
inputs: itemsCount - number of total items
        pageSize - the amount of items on each oage
events: onPageChange(newPageNumber) - raised by this component whenever the page number changeson
output:
*/

// lodash@4.17.10 installed to facilitate the creation of the pages array
//algorithm - using page size and total items create an array of page numbers. map array to bootstrap buttons
// for timebeing im avoiding lowdash and using my own function

// import _ from "lodash";

const range = (lowerBound, upperBound) => {
  // returns array containing numbers from lowerBound to upperBound, inclusive on both ends
  let arr = [];
  for (let i = lowerBound; i <= upperBound; i++) {
    arr.push(i);
  }
  return arr;
};

const Pagination = props => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize); // so we don't run into floating point issues
  const pagesArr = range(1, pagesCount); // otherwise range does not include upper boundary
  console.log("pages array: ", pagesArr);
  console.log("pagesCount ", pagesCount);
  console.log("current page is: ", currentPage);
  if (pagesCount === 1) return <span>End of data</span>; // dont render pagination if only one page

  // calculate out arrage of page numbers, or use lodash (underscore as alternative);

  //for time being, no first last prev next buttons.
  return (
    <React.Fragment>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {/* <li className="page-item">
            <a className="page-link" onClick={() => props.onPageChange(1)}>
              Previous
            </a>
          </li> */}
          {pagesArr.map(page => (
            <li key={page} className={formatClasses}>
              <a className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </a>
            </li>
          ))}
          {/* <li className="page-item">
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
          </li> */}
          {/* <li className="page-item">
            <a className="page-link" onClick={() => props.onPageChange(1)}>
              Next
            </a>
          </li> */}
        </ul>
      </nav>
    </React.Fragment>
  );
};

formatClasses = pageNumber => {
  const classes = "page-item";
  if (pageNumber === 1) {
    classes += " active";
  }
  return classes;
};
export default Pagination;
