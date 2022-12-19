import { FaSortUp, FaSortDown } from "react-icons/fa";

function TableHeader({ columns, sortColumn, onSort }) {
  const raiseSort = (path) => {
    const newSortColumn = { ...sortColumn };

    if (path === newSortColumn.path) {
      newSortColumn.order = newSortColumn.order === "asc" ? "desc" : "asc";
    } else {
      newSortColumn.path = path;
      newSortColumn.order = "asc";
    }

    onSort(newSortColumn);
  };

  const renderIcon = (path) => {
    if (sortColumn.path !== path || !sortColumn.path) return null;
    if (sortColumn.order === "asc") return <FaSortUp />;
    return <FaSortDown />;
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
          >
            {column.label}
            {renderIcon(column.path)}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
