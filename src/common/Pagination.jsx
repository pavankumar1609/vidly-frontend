import _ from "lodash";
import propTypes from "prop-types";
import { Link } from "react-router-dom";

function Pagination(props) {
  const {
    itemsCount,
    pageSize,
    currentPage,
    onPageChange,
    onPrevPage,
    onNextPage,
    minPageNumberLimit,
    maxPageNumberLimit,
  } = props;
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  function renderPageNumbers(pages) {
    return pages.map((page) => {
      if (page <= maxPageNumberLimit && page > minPageNumberLimit)
        return (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <Link
              to="#"
              onClick={() => onPageChange(page)}
              className="page-link clickable"
            >
              {page}
            </Link>
          </li>
        );
      return null;
    });
  }

  return (
    <div className="row">
      <div className="col">
        <nav>
          <ul className="pagination">
            {!!itemsCount && (
              <li className="page-item text-center">
                <Link
                  to="#"
                  onClick={onPrevPage}
                  className={
                    currentPage === 1 ? "page-link disabled" : "page-link"
                  }
                >
                  Prev
                </Link>
              </li>
            )}
            {renderPageNumbers(pages)}
            {!!itemsCount && (
              <li className="page-item text-center">
                <Link
                  to="#"
                  onClick={onNextPage}
                  className={
                    currentPage === pageCount
                      ? "page-link disabled"
                      : "page-link"
                  }
                >
                  Next
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
      <div className="col-2">
        {!!itemsCount && (
          <p className="alert alert-info p-1 text-center">
            Page {currentPage} / {pages.length}
          </p>
        )}
      </div>
    </div>
  );
}

Pagination.propTypes = {
  itemsCount: propTypes.number.isRequired,
  pageSize: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  onPageChange: propTypes.func.isRequired,
  onPrevPage: propTypes.func.isRequired,
  onNextPage: propTypes.func.isRequired,
  minPageNumberLimit: propTypes.number.isRequired,
  maxPageNumberLimit: propTypes.number.isRequired,
};

export default Pagination;
