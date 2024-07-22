import React, { useEffect, useState } from "react";
import { MdPersonOutline } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineDateRange } from "react-icons/md";
import { customers } from "../DummyDate";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import CustomerMap from "./CustomerMap";
import Pagination from "./Pagination";

const Customers = () => {
  const [customersSearch, setCustomersSearch] = useState(customers);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPge, SetPostsPerPage] = useState(4);
  

  const indexOfLastPost = currentPage * postsPerPge;
  const indexOfFirstPost = indexOfLastPost - postsPerPge;
  const currentPosts = customersSearch.slice(indexOfFirstPost, indexOfLastPost);

  const handlePaginationNext = (length) => {
    if(currentPage === length){
      return;
    }
    setCurrentPage(currentPage+1);
  };

  const handlePaginationPrev = (length) => {
    if(currentPage === 1){
      return;
    }
    setCurrentPage(currentPage-1);
  };

  const handlefilter = () => {
    const filteredCustomers = customers.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setCustomersSearch(filteredCustomers);
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-row items-center justify-between p-4">
          <span className="flex flex-row items-center gap-10">
            <h1 className="text-2xl font-semibold">Customers</h1>
            <button
              className="text-lg text-gray-500 bg-[#f9f9fa] border-2 rounded-lg px-4 py-1 font-bold
          hover:bg-gray-200 transition-all"
            >
              {" "}
              <big>+</big> New
            </button>
          </span>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-row items-center gap-2 text-lg"
          >
            <span className="flex flex-row items-center">
              <input
                type="text"
                placeholder="Search Customer"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={` bg-gray-100 rounded-s-lg ${
                  search === "" ? "rounded-e-lg" : ""
                } px-4 py-1 outline-none`}
              />
              <span
                className={`${search === "" ? "hidden" : "block"}
              text-gray-400 font-medium bg-gray-100 py-1 px-4 rounded-e-lg cursor-pointer`}
                onClick={() => {
                  setCustomersSearch(customers);
                  setSearch("");
                }}
              >
                X
              </span>
            </span>

            <button
              onClick={() => handlefilter()}
              type="submit"
              className="font-semibold bg-greenBtn text-white rounded-lg px-4 py-1 cursor-pointer transition-all  hover:bg-greenBtnHover"
            >
              Search
            </button>
          </form>
        </div>

        <div className="flex flex-col">
          <CustomerMap customersSearch={currentPosts} />
          <Pagination
            length={customersSearch.length}
            postsPerPage={postsPerPge}
            handlePaginationNext={handlePaginationNext}
            handlePaginationPrev={handlePaginationPrev}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  );
};

export default Customers;
