import React, { Component } from "react";
import _ from "lodash";
/* reusable table body component
interface:
    - data - can be anything at this point
    -  columns: [{ path (can be nested - this is the path to our data to display. no label needed since there are no headers)}] object with  / cells to display
    - sortColumn [{path, order: asc/desc}]

*/

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) {
      // if content exists / truthy, get the function which will reutrn react eleemnt and render it
      return column.content(item);
    } // otherwise, just get the content at path
    else return _.get(item, column.path);
  };

  createKey = (item, column) => item._id + (column.path || column.key);
  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            {columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
              //tricky - we must be able to render both text content, and costum content in cells. use lodash for this
              // lodash gets the path inside the item.
              // if the item has a content property (complex markup), render the content, otherwise, just render the item
            ))}
          </tr>
        ))}

        {/* //   <tr key={m._id}>
        //     <td>{m.title}</td>
        //     <td>{m.genre.name}</td>
        //     <td>{m.numberInStock}</td>
        //     <td>{m.dailyRentalRate}</td>
        //     <td>
        //       <Like liked={m.liked} onClick={() => onLike(m)} />
        //     </td>
        //     <td>
        //       <button
        //         className="btn btn-danger btn-sm"
        //         onClick={() => onDelete(m._id)}
        //       >
        //         Delete
        //       </button>
        //     </td>
        //   </tr>
        // ))} */}
      </tbody>
    );
  }
}

export default TableBody;
