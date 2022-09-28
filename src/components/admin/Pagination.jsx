import React from "react";

const Pagination = ({ itemsPerPage, total, paginate, currPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(total / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pageNumbers">
      {pageNumbers.map((number) => (
        <li key={number}>
          <a
            className={number === currPage ? "active" : ""}
            onClick={(evt) => {
              evt.preventDefault();
              paginate(number);
              window.scrollTo(0, 0);
            }}
          >
            {number}
          </a>
        </li>
      ))}
    </nav>
  );
};

export default Pagination;
