import { useContext } from "react";
import { Link } from "react-router-dom";
import Table from "../common/Table";
import Like from "./../common/Like";
import UserContext from "./../context/userContext";

function MoviesTable({ movies, onLike, onDelete, onSort, sortColumn }) {
  const user = useContext(UserContext);

  const columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link className="clickable" to={`/movies/${movie._id}`}>
          {movie.title}
        </Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onLike={() => onLike(movie)} />
      ),
    },
  ];

  if (user && user.isAdmin) {
    columns.push({
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    });
  }

  return (
    <Table
      data={movies}
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
}

export default MoviesTable;
