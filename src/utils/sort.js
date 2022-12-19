import _ from "lodash";

export function sort(sortColumn, filtered) {
  const sorted =
    sortColumn.path === "title"
      ? _.orderBy(
          filtered,
          [(movie) => movie.title?.toLowerCase()],
          [sortColumn.order]
        )
      : _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

  return sorted;
}
