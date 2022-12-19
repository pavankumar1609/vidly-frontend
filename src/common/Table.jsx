import TableBody from "../common/TableBody";
import TableHeader from "../common/TableHeader";

function Table({ data, columns, sortColumn, onSort }) {
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody items={data} columns={columns} />
    </table>
  );
}

export default Table;
