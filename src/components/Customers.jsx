import React, { useEffect, useState } from "react";
import { MdPersonOutline } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineDateRange } from "react-icons/md";

const Customers = ({ customers }) => {
  const [customersSearch, setCustomersSearch] = useState(customers);
  const [search, setSearch] = useState("");

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

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-4">
          {customersSearch.map((item) => (
            <div
              className="flex flex-col gap-4 border-2 rounded-xl p-4"
              key={item.id}
            >
              <span className="flex flex-row itams-center gap-3">
                <span className="flex justify-center items-center bg-gray-100 text-gray-500 p-3 rounded-full">
                  <MdPersonOutline size={25} />
                </span>
                <span className="flex flex-col font-semibold">
                  <h1 className="text-lg font-semibold">{item.name} </h1>
                  <p className="text-gray-500 flex items-center gap-2">
                    <BsTelephone /> {item.phone}
                  </p>
                </span>
              </span>
              <span className="flex flex-rox items-center text-gray-500 font-semibold">
                <MdOutlineDateRange className="mr-1" />
                {item.date}, {item.time}
              </span>

              <span className="grid grid-cols-2 items-center gap-3">
                <button className="px-4 py-1 text-gray-500 font-semibold text-xl bg-gray-100 rounded-lg transition-all hover:bg-gray-200">
                  {" "}
                  Edit
                </button>
                <button className="px-4 py-1 text-[red] font-semibold text-xl bg-gray-100 rounded-lg transition-all hover:bg-[red] hover:text-white">
                  {" "}
                  Delete
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Customers;
