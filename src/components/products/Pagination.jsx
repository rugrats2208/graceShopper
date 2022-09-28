import React from 'react';

function Pagination({
  productsPerPage,
  totalProducts,
  paginate,
  page,
  nextPage,
  prevPage,
}) {
  const pageNums = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNums.push(i);
  }

  return (
    <nav>
      <ul
        id="all-products-paginate"
        className="pagination justify-content-center"
      >
        <li className="page-item">
          <a
            onClick={() => (page > 1 ? prevPage() : null)}
            className="page-link"
          >
            Previous
          </a>
        </li>
        {pageNums.map((number) => (
          <li
            key={number}
            className={`page-item ${number === page ? 'active' : null}`}
          >
            <a onClick={() => paginate(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a
            onClick={() => (page < 4 ? nextPage() : null)}
            className="page-link"
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
