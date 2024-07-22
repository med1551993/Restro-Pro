import React, { useEffect, useState } from "react";
import { LuPrinter } from "react-icons/lu";
import { TbInvoice } from "react-icons/tb";
import { invoices } from "../DummyDate";

const Invoices = () => {
  const [invoiceSearch, setInvoiceSearch] = useState(invoices);
  const [search, setSearch] = useState("");

  const handlefilter = () => {
    const filteredInvoices = invoices.filter((item) =>
      item.Customer.toLowerCase().includes(search.toLowerCase())
    );
    setInvoiceSearch(filteredInvoices);
  };

  return (
    <>
      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Customers</h1>

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
            {invoiceSearch.map((item) => (
              <tr className="*:p-2" key={item.id}>
                <td>{item.Invoice_ID}</td>
                <td>{item.Order_IDs}</td>
                <td>{item.Tokens}</td>
                <td>{item.Date}</td>
                <td>{item.Subtotal}</td>
                <td>{item.Tax}</td>
                <td className="font-bold">{item.Total}</td>
                <td>{item.Delivery_Type}</td>
                <td className="font-bold">{item.Customer}</td>
                <td className="font-bold">{item.Table}</td>
                <td className="flex flex-row gap-2 *:bg-gray-100 *:p-1 *:rounded-full *:text-gray-500 *:cursor-pointer *:transition-all">
                  <TbInvoice size={25} className="hover:bg-gray-200" />{" "}
                  <LuPrinter size={25} className="hover:bg-gray-200" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Invoices;
