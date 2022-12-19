function ListGroup(props) {
  const { items, textProperty, textValue, selectedItem, onSelectItem } = props;

  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[textValue]}
          onClick={() => onSelectItem(item)}
          className={
            item[textValue] === selectedItem[textValue]
              ? "list-group-item clickable active"
              : "list-group-item clickable"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
}

ListGroup.defaultProps = {
  textProperty: "name",
  textValue: "_id",
};

export default ListGroup;
