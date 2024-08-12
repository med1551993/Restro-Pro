import React, { useEffect, useState } from "react";
/* import { customers } from "../DummyDate"; */
import CustomerMap from "./CustomerMap";
import Pagination from "./Pagination";
import axios from "axios";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
const Customers = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [customers, setCustomers] = useState([]);
  const [customersSearch, setCustomersSearch] = useState(customers);
  const [customerName, setCustomerName] = useState("");
  const [customerGender, setCustomerGender] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

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
    handleRefresh();
    const datetime = format(new Date(), "dd/MM/yyyy, HH:mm:ss");
    const newCustomer = {
      name: customerName,
      gender: customerGender,
      phone: customerPhone,
      datetime,
    };
    try {
      const response = await axios.post(
        "http://localhost:3600/customers",
        newCustomer
      );
      const allCustomers = [...customers, response.data];
      setCustomers(allCustomers);
      setCustomersSearch(customers);
      setCustomerName("");
      setCustomerPhone("");
      setCustomerGender("");
      setCustomerOverlay(false);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3600/customers/${id}`);
      const allCustomers = customersSearch.filter((item) => item.id !== id);
      setCustomers(allCustomers);
      setCustomersSearch(customers);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleEdit = async (id, datetime) => {
    const updatedCustomer = {
      id,
      name: customerName,
      phone: customerPhone,
      datetime,
    };
    try {
      const response = await axios.put(
        `http://localhost:3600/customers/${id}`,
        updatedCustomer
      );
      setCustomers(
        customers.map((item) => (item.id === id ? { ...response.data } : item))
      );
      setCustomersSearch(customers);
      setCustomerName("");
      setCustomerPhone("");
      navigate(-1);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const Response = await axios.get("http://localhost:3600/customers");
        setCustomers(Response.data);
        setCustomersSearch(customers);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    handlefilter();
  }, [customers]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`absolute ${
          CustomerOverlay ? "flex" : "hidden"
        } items-center justify-center top-0 left-0 z-99999999 w-full h-full bg-black/50`}
      >
        <div className="flex flex-col gap-6 w-[30rem] h-auto bg-white rounded-2xl p-6 shadow-lg ml-3 mr-3">
          <h2 className="text-lg font-extrabold">Adding new customer</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="text-base font-medium">Name</label>
            <input
              placeholder="Enter Customer's Name"
              autoComplete="off"
              className=" text-sm w-full px-3 py-2 rounded-[5px] border-[1px] border-gray-300 outline-blue-400  required"
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            ></input>

            <span className="text-base font-medium">Gender</span>
            <div className="flex flex-row">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="accountType"
                  value="Mr."
                  onChange={(e) => setCustomerGender(e.target.value)}
                ></input>
                <span className="ml-2">Mr</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio"
                  name="accountType"
                  value="Mrs."
                  onChange={(e) => setCustomerGender(e.target.value)}
                ></input>
                <span className="ml-2">Mrs</span>
              </label>
            </div>

            <label className="text-base font-medium">Phone </label>
            <input
              placeholder="Enter Customer's Phone No"
              type="text"
              className=" text-sm w-full px-3 py-2 rounded-[5px] border-[1px] border-gray-300 outline-blue-400 mb-4 required"
              autoComplete="off"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
            ></input>
            <div className="flex flex-row gap-2 items-center justify-end">
              <button
                type="button"
                className="text-gray-500 font-semibold flex items-center gap-1 bg-gray-200 rounded-lg p-2 cursor-pointer transition-all hover:bg-gray-300"
                onClick={() => {
                  setCustomerOverlay(false);
                  setCustomerName("");
                  setCustomerPhone("");
                  setCustomerGender("");
                }}
              >
                Close
              </button>
              <button
                disabled={
                  !customerName || !customerPhone || !customerGender
                    ? true
                    : false
                }
                onClick={() => handleSubmit}
                type="submit"
                className={`font-semibold bg-greenBtn text-white rounded-lg p-2 transition-all 
                           ${
                             !customerName || !customerPhone || !customerGender
                               ? "opacity-35"
                               : "hover:bg-greenBtnHover cursor-pointer"
                           }  `}
              >
                Add Customer
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4">
          <span className="flex flex-row items-center gap-10">
            <h1 className="text-2xl font-semibold">Customers</h1>
            <button
              className=" text-gray-500 bg-[#f9f9fa] border-[1px] rounded-lg px-4 py-1 text-base font-medium
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
                className={` bg-gray-100 rounded-s-lg text-base ${
                  search === "" ? "rounded-e-lg" : ""
                } px-4 py-1 outline-none`}
              />
              <span
                className={`${search === "" ? "hidden" : "block"}
              text-gray-400 text-base font-medium bg-gray-100 py-1 px-4 rounded-e-lg cursor-pointer`}
                onClick={() => {
                  setCustomersSearch(customers);
                  setSearch("");
                }}
              >
                X
              </span>
            </span>

            <button
              onClick={() => {
                handlefilter();
                handleRefresh();
              }}
              type="submit"
              className="text-base font-semibold bg-greenBtn text-white rounded-lg px-4 py-1 cursor-pointer transition-all  hover:bg-greenBtnHover"
            >
              Search
            </button>
          </form>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-col p-4 gap-6">
            <CustomerMap
              customerName={customerName}
              setCustomerName={setCustomerName}
              customerPhone={customerPhone}
              setCustomerPhone={setCustomerPhone}
              customersSearch={currentCustomers}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
            <Pagination
              currentCustomers={currentCustomers}
              length={customersSearch.length}
              postsPerPage={postsPerPge}
              handlePaginationNext={handlePaginationNext}
              handlePaginationPrev={handlePaginationPrev}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Customers;
