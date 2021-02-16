import React from "react";
import "./pagination.css";

function Pagination({ postsPerPage, totalPosts, paginate, currentPage }) {
  const pageNumbers = [];
  let limit = Math.ceil(totalPosts / postsPerPage);
  for (let i = 1; i <= limit; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className='pagination'>
      {pageNumbers.map((number) => (
        <a
          key={number}
          onClick={() => paginate(number)}
          href='!#'
          className={number === currentPage ? "active" : null}
        >
          {number}
        </a>
      ))}
    </div>
  );
}

export default Pagination;
