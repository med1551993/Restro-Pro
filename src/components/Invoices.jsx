import React, { useEffect, useState, useRef } from "react";
import { LuPrinter } from "react-icons/lu";
import { TbInvoice } from "react-icons/tb";
import { invoices } from "../DummyDate";
import { Link, Route, Routes } from "react-router-dom";
import Template from "./PDF/Template";
import axios from "axios";
import ReactPrint from "react-to-print";

const Invoices = () => {
  const [search, setSearch] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [invoiceSearch, setInvoiceSearch] = useState([]);

  const handlefilter = () => {
    const filteredInvoices = invoices.filter((item) =>
      item.customer.toLowerCase().includes(search.toLowerCase())
    );
    setInvoiceSearch(filteredInvoices);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3600/invoices");

        setInvoices(response.data);
        setInvoiceSearch(response.data);
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

    fetchOrders();
  }, []);

  return (
    <>
      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Invoices</h1>

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
                  setInvoiceSearch(invoices);
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
        <h2 className="text-lg font-medium mb-6">
          Showing Invoices for This Month
        </h2>
        <table className="table-auto border-2">
          <thead className="border-b-[1px]">
            <tr className="text-gray-500 *:text-xs *:text-start *:p-2 ">
              <th>Invoice ID</th>
              <th>Order IDs</th>
              <th>Tokens</th>
              <th>Date</th>
              <th>Subtotal</th>
              <th>Tax</th>
              <th>Total</th>
              <th>Delivery Type</th>
              <th>Customer</th>
              <th>Table</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-xs font-semibold [&>*:nth-child(even)]:bg-gray-100">
            {invoiceSearch.reverse().map((item) => (
              <tr className="*:p-2" key={item.id}>
                <td>{item.id}</td>
                <td>{item.data.id}</td>

                <td>{invoiceSearch.indexOf(item) + 1}</td>
                <td>
                  {item.data.date}, {item.data.time}
                </td>

                <td>
                  {item.data.data.reduce((cartTotal, cartItem) => {
                    return (cartTotal =
                      cartTotal + cartItem.price * cartItem.qty);
                  }, 0)}
                </td>

                <td>{item.data.Tax}</td>
                <td className="font-bold">
                  {item.data.data.reduce((cartTotal, cartItem) => {
                    return (cartTotal =
                      cartTotal + cartItem.price * cartItem.qty);
                  }, 0)}{" "}
                  + {item.tax}
                </td>
                <td>{item.data.diningOption}</td>
                <td className="font-bold">{item.data.customer}</td>
                <td className="font-bold">
                  {item.data.table.length !== 0 ? item.data.table : "-"}
                </td>
                <td className="flex flex-row gap-2 *:bg-gray-100 *:p-2 *:rounded-full *:text-gray-500 *:cursor-pointer *:transition-all">
                  <Link
                    to={`./Template/${item.data.id}`}
                    className="hover:bg-gray-200"
                  >
                    <TbInvoice size={25} />
                  </Link>
                  <ReactPrint
                    trigger={() => (
                      <button className="hover:bg-gray-200">
                        <LuPrinter size={25} />
                      </button>
                    )}
                    content={() => item.data.id}
                    documentTitle={`INVOICE ${item.data.id}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Routes>
        <Route
          path="/Template/:id"
          element={<Template invoices={invoices} />}
        />
      </Routes>
    </>
  );
};

export default Invoices;
