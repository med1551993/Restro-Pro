import React from "react";
import { LuPrinter } from "react-icons/lu";
import { TbListDetails } from "react-icons/tb";

const Invoices = () => {
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
                placeholder="Search Invoices"
                className=" bg-gray-100 rounded-lg px-4 py-1 outline-none"
              />
            </span>
            <button
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
              <th c>Invoice ID</th>
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
            <tr className="*:p-2">
              <td>2</td>
              <td>3.2</td>
              <td>3.2</td>
              <td>Apr 13,2024, 4:17 PM</td>
              <td>US$190.95</td>
              <td>US$10.55</td>
              <td className="font-bold">US$201.50</td>
              <td>dinein</td>
              <td className="font-bold">Rinki Patel-(9876543210)</td>
              <td className="font-bold">Table 2-1st Floor</td>
              <td className="flex flex-row gap-2 *:bg-gray-100 *:p-1 *:rounded-full *:text-gray-500 *:cursor-pointer">
                <TbListDetails size={25} /> <LuPrinter size={25} />
              </td>
            </tr>
            <tr className="*:p-2">
              <td>2</td>
              <td>3.2</td>
              <td>3.2</td>
              <td>Apr 13,2024, 4:17 PM</td>
              <td>US$190.95</td>
              <td>US$10.55</td>
              <td className="font-bold">US$201.50</td>
              <td>dinein</td>
              <td className="font-bold">Rinki Patel-(9876543210)</td>
              <td className="font-bold">Table 2-1st Floor</td>
              <td className="flex flex-row gap-2 *:bg-gray-100 *:p-1 *:rounded-full *:text-gray-500 *:cursor-pointer">
                <TbListDetails size={25} /> <LuPrinter size={25} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Invoices;
