export function filter(selectedGenre, movies, searchQuery) {
  let filtered = movies;

  if (searchQuery)
    filtered = movies.filter((movie) =>
      movie.title.toLowerCase().startsWith(searchQuery.toLocaleLowerCase())
    );
  else if (selectedGenre && selectedGenre._id)
    filtered = movies.filter((m) => m.genre._id === selectedGenre._id);

  return filtered;
}
