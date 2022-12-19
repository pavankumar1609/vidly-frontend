import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ListGroup from "../common/ListGroup";
import Pagination from "../common/Pagination";
import MoviesTable from "./MoviesTable";
import { paginate } from "./../utils/paginate";
import { filter } from "./../utils/filter";
import { sort } from "./../utils/sort";
import { getGenres } from "./../services/genreService";
import { getMovies, deleteMovie } from "./../services/movieService";
import SearchBox from "../common/SearchBox";
import Loading from "./../common/Loading";

function Movies({ user }) {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(4);
  const [selectedGenre, setSelectedGenre] = useState({ _id: "" });
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
  const pageSize = 4;
  const pageNumberLimit = 4;

  useEffect(() => {
    const getData = async () => {
      const { data } = await getGenres();
      const genres = [{ _id: "", name: "All Genres" }, ...data];
      setGenres(genres);

      const { data: movies } = await getMovies();
      setMovies(movies);
      setLoading(true);
    };

    getData();
  }, []);

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
    setSearchQuery("");
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setSelectedGenre({ _id: "" });
  };

  const handleLike = (movie) => {
    const newMovies = [...movies];
    const index = newMovies.indexOf(movie);
    newMovies[index] = { ...movie };
    newMovies[index].liked = !newMovies[index].liked;
    setMovies(newMovies);
  };

  const handleDelete = async (movie) => {
    const originalMovies = movies;

    const newovies = originalMovies.filter((m) => m._id !== movie._id);
    setMovies(newovies);

    try {
      await deleteMovie(movie._id);
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast("This movie has already been deleted.");

      setMovies(originalMovies);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const filtered = filter(selectedGenre, movies, searchQuery);

  const sorted = sort(sortColumn, filtered);

  const moviesList = paginate(sorted, currentPage, pageSize);

  if (!loading) return <Loading />;

  return (
    <div className="row">
      <div className="col-2">
        <ListGroup
          items={genres}
          selectedItem={selectedGenre}
          onSelectItem={handleGenreSelect}
        />
      </div>
      <div className="col">
        {user && (
          <Link to="/movies/new" className="btn btn-primary btn-sm mb-3">
            New Movie
          </Link>
        )}
        <p>Showing {filtered.length} movies in the database.</p>
        <SearchBox value={searchQuery} onChange={handleSearch} />
        <MoviesTable
          movies={moviesList}
          onLike={handleLike}
          onDelete={handleDelete}
          onSort={handleSort}
          sortColumn={sortColumn}
        />
        <Pagination
          itemsCount={filtered.length}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          currentPage={currentPage}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
          minPageNumberLimit={minPageNumberLimit}
          maxPageNumberLimit={maxPageNumberLimit}
        />
      </div>
    </div>
  );
}

export default Movies;
