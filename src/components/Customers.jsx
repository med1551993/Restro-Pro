import React, { useState } from "react";
import { customers } from "../DummyDate";
import CustomerMap from "./CustomerMap";
import Pagination from "./Pagination";

const Customers = () => {
  const [customersSearch, setCustomersSearch] = useState(customers);
  const [search, setSearch] = useState("");

  const [CustomerOverlay, setCustomerOverlay] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPge, SetPostsPerPage] = useState(4);

  const indexOfLastPost = currentPage * postsPerPge;
  const indexOfFirstPost = indexOfLastPost - postsPerPge;
  const currentCustomers = customersSearch.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const handlePaginationNext = (length) => {
    if (currentPage === length) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  const handlePaginationPrev = (length) => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  };

  const handlefilter = () => {
    const filteredCustomers = customers.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setCustomersSearch(filteredCustomers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCustomerOverlay(false);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`absolute ${
          CustomerOverlay ? "flex" : "hidden"
        } items-center justify-center top-0 left-0 z-99999999 w-full h-full bg-black/50`}
      >
        <div className="flex flex-col gap-6 w-[30rem] h-auto bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-extrabold">Adding new customer</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label htmlFor="username" className="text-[1.1rem] font-medium">
              Customer's Name
            </label>
            <input
              id="username"
              autoComplete="off"
              className="bg-[#f2f2f2] w-full px-3 py-2 rounded-md border-none outline-none mb-4 required"
              type="text"
            ></input>

            <label className="text-[1.1rem] font-medium">Phone Number</label>
            <input
              type="text"
              className="bg-[#f2f2f2] w-full px-3 py-2 rounded-s-md border-none outline-none mb-4 required"
              autoComplete="off"
            ></input>
            <div className="flex flex-row gap-2 items-center justify-end">
              <button
                className="text-gray-500 font-semibold flex items-center gap-1 bg-gray-200 rounded-lg p-2 cursor-pointer transition-all hover:bg-gray-300"
                onClick={() => setCustomerOverlay(false)}
              >
                Close
              </button>
              <button
                type="submit"
                className="font-semibold bg-greenBtn text-white rounded-lg p-2 cursor-pointer transition-all  hover:bg-greenBtnHover"
              >
                Add Customer
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4">
          <span className="flex flex-row items-center gap-10">
            <h1 className="text-2xl font-semibold">Customers</h1>
            <button
              className="text-lg text-gray-500 bg-[#f9f9fa] border-2 rounded-lg px-4 py-1 font-bold
          hover:bg-gray-200 transition-all"
              onClick={() => setCustomerOverlay(true)}
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

        <div className="flex flex-col p-4 gap-6">
          <CustomerMap customersSearch={currentCustomers} />
          <Pagination
            length={customersSearch.length}
            postsPerPage={postsPerPge}
            handlePaginationNext={handlePaginationNext}
            handlePaginationPrev={handlePaginationPrev}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
};

export default Customers;
