import React, { useState } from "react";

const Pagination = ({
  postsPerPage,
  length,
  handlePaginationNext,
  handlePaginationPrev,
  currentPage,
}) => {
  let paginationNumber = [];
  for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
    paginationNumber.push(i);
  }

  return (
    <div className="pagination">
      {/*   {paginationNumber.map((data) => (
        <button
          key={data}
          onClick={() => handlePagination(data)}
          className={currentPage === data ? "active" : ""}
        >
          {data}
        </button>
      ))} */}
      <button
        onClick={() => handlePaginationPrev(paginationNumber.length)}
        className="text-lg text-gray-500 bg-gray-100 rounded-s-lg px-4 py-1 font-bold
          hover:bg-gray-200 transition-all"
      >
        --
      </button>
      <button
        onClick={() => handlePaginationPrev(paginationNumber.length)}
        className="text-lg text-gray-500 bg-gray-100 px-4 py-1 font-bold
          hover:bg-gray-200 transition-all"
      >
        -
      </button>
      <span
        className="text-lg text-gray-500 bg-gray-100 rounded-s-lg px-4 py-1 font-bold
          hover:bg-gray-200 transition-all"
      >
        {currentPage}
      </span>
      {currentPage}
      <button
        onClick={() => handlePaginationNext(paginationNumber.length)}
        className="text-lg text-gray-500 bg-gray-100  px-4 py-1 font-bold
          hover:bg-gray-200 transition-all"
      >
        +
      </button>
      <button
        onClick={() => handlePaginationNext(paginationNumber.length)}
        className="text-lg text-gray-500 bg-gray-100 rounded-e-lg px-4 py-1 font-bold
          hover:bg-gray-200 transition-all"
      >
        ++
      </button>
    </div>
  );
};
export default Pagination;
