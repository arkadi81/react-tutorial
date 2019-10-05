import React from "react";
import PropTypes from "prop-types";

/*Interface:
inputs: itemsCount - number of total items
        pageSize - the amount of items on each oage
        currentPage - which page we're currently on
events: onPageChange(newPageNumber) - raised by this component whenever the page number changeson
output:
*/

// lodash@4.17.10 installed to facilitate the creation of the pages array
//algorithm - using page size and total items create an array of page numbers. map array to bootstrap buttons
// for timebeing im avoiding lowdash and using my own function

import _ from "lodash";

const range = (lowerBound, upperBound) => {
  // returns array containing numbers from lowerBound to upperBound, inclusive on both ends
  let arr = [];
  for (let i = lowerBound; i <= upperBound; i++) {
    arr.push(i);
  }
  return arr;
};

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  // const { itemsCount, pageSize, onPageChange, currentPage } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize); // so we don't run into floating point issues
  const pagesArr = range(1, pagesCount); // otherwise range does not include upper boundary
  console.log("pages array: ", pagesArr);
  console.log("pagesCount ", pagesCount);
  console.log("current page is: ", currentPage);
  if (pagesCount === 1) return <span>End of data</span>; // dont render pagination if only one page

  const formatClasses = pageNumber => {
    let classes = "page-item";
    if (pageNumber === currentPage) {
      classes += " active";
    }
    return classes;
  };

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
            <li key={page} className={formatClasses(page)}>
              <a className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </React.Fragment>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
