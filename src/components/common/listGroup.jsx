import React from "react";

const ListGroup = props => {
  const {
    items,
    textProperty,
    valueProperty,
    selectedItem,
    onSelectItem
  } = props;
  return (
    <>
      <ul className="list-group">
        {items.map(item => (
          <li
            key={item[valueProperty]}
            className={
              item.name === selectedItem.name
                ? "list-group-item active"
                : "list-group-item "
            }
            onClick={() => onSelectItem(item)}
          >
            {item[textProperty]}
          </li>
        ))}
      </ul>
    </>
  );
};
//add default props after the creation of the component
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
