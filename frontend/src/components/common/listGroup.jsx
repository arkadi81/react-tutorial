import React, { Component } from "react";

/* list group component
in:  - items - list of items
    - textProperty - the name of the text fields (optional)
    - valueProperty - the name of the value field (optional)
    - the current filter
    - selectedItem - the currently selected item

raise: onGenreChange

*/

class ListGroup extends Component {
  render() {
    const {
      items,
      textProperty,
      valueProperty,
      onItemSelect,
      selectedItem
    } = this.props;
    console.log("props: ", this.props.items);
    return (
      <ul className="list-group">
        {items.map(item => (
          <li
            key={item[valueProperty]}
            className={
              item == selectedItem
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => onItemSelect(item)}
          >
            {item[textProperty]}
          </li>
        ))}
      </ul>
    );
  }
}

ListGroup.defaultProps = { textProperty: "name", valueProperty: "_id" };

export default ListGroup;
