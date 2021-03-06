import _ from "lodash";
import PropTypes from "prop-types";

export function paginate(itemsArray, pageNumber, pageSize) {
  /* get an array of items, page size and the number of the page we need,
    returns array of items matching current page and size
    
    DNF error checking!*/
  const startIndex = pageSize * (pageNumber - 1);

  //   _.slice(itemsArray, startIndex); // will slice array from starting index

  //   _.take(itemsArray, pageSize); // will take indicated number of elements from beginning of array
  return _(itemsArray)
    .slice(startIndex)
    .take(pageSize)
    .value(); // value will return a reg array

  // note - pagination can (and probably should) be done on server
}
