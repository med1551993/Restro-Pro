import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

const Pagination = ({
  currentCustomers,
  postsPerPage,
  length,
  handlePaginationNext,
  handlePaginationPrev,
  currentPage,
  setCurrentPage,
}) => {
  let paginationNumber = [];
  for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
    paginationNumber.push(i);
  }

  return (
    <div className="flex flex-col gap-2 items-end">
      <div className="flex flex-row justify-center">
        <button
          onClick={() => setCurrentPage(1)}
          className={`text-lg text-gray-500 bg-gray-100 border-r-2 border-gray-300 rounded-s-lg px-4 py-1 font-bold
            ${
              currentPage === 1
                ? "bg-gray-200"
                : "hover:bg-gray-200 transition-all"
            }`}
          disabled={currentPage === 1 ? true : false}
        >
          <MdKeyboardDoubleArrowLeft size={20} />
        </button>
        <button
          onClick={() => handlePaginationPrev(paginationNumber.length)}
          className={`text-lg text-gray-500 bg-gray-100 px-4 py-1 font-bold border-r-2 border-gray-300
         ${
           currentPage === 1
             ? "bg-gray-200"
             : "hover:bg-gray-200 transition-all"
         }`}
          disabled={currentPage === 1 ? true : false}
        >
          <MdKeyboardArrowLeft size={20} />
        </button>
        <span className="text-sm text-gray-500 bg-gray-100 px-4 py-1 font-bold">
          Page {currentPage}
        </span>
        <button
          onClick={() => handlePaginationNext(paginationNumber.length)}
          className={`text-lg text-gray-500 bg-gray-100  px-4 py-1 font-bold border-l-2 border-gray-300
          ${
            currentPage === paginationNumber.length
              ? "bg-gray-200"
              : "hover:bg-gray-200 transition-all"
          }`}
          disabled={currentPage === paginationNumber.length ? true : false}
        >
          <MdKeyboardArrowRight size={20} />
        </button>
        <button
          onClick={() => setCurrentPage(paginationNumber.length)}
          className={`text-lg text-gray-500 bg-gray-100 rounded-e-lg px-4 py-1 font-bold border-l-2 border-gray-300
           ${
             currentPage === paginationNumber.length
               ? "bg-gray-200"
               : "hover:bg-gray-200 transition-all"
           }`}
          disabled={currentPage === paginationNumber.length ? true : false}
        >
          <MdKeyboardDoubleArrowRight size={20} />
        </button>
      </div>
      <span className="text-sm font-bold">
        Showing {currentCustomers.length} of {length}
      </span>
    </div>
  );
};
export default Pagination;
