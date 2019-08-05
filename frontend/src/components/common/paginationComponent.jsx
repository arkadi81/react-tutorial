import React from "react";

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
            <a className="page-link" href="#">
              First (TODO)
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Previous (TODO)
            </a>
          </li>
          {pagesArr.map(pageNum => (
            <li
              className={
                pageNum === currentPage ? "page-item active" : "page-item"
              }
              key={pageNum}
            >
              <a className="page-link" onClick={() => onPageChange(pageNum)}>
                {pageNum}
              </a>
            </li>
          ))}

          <li className="page-item">
            <a className="page-link" href="#">
              Next (TODO)
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Last (TODO)
            </a>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default Pagination;
