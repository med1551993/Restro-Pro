import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import Loading from "../Loading";

const TaxSetup = ({
  taxs,
  taxTitel,
  setTaxTitle,
  taxRate,
  setTaxRate,
  taxOverlay,
  setTaxOverlay,
  handleTaxsSubmit,
  handleTaxDelete,
  loading,
}) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`absolute ${
          taxOverlay ? "flex" : "hidden"
        } items-center justify-center top-0 left-0 z-50 w-full h-full bg-black/50`}
      >
        <div className="flex flex-col gap-6 w-[30rem] h-auto bg-white rounded-2xl p-6 shadow-lg ml-3 mr-3">
          <h2 className="text-lg font-extrabold">Adding new Table</h2>
          <form onSubmit={handleTaxsSubmit} className="flex flex-col gap-4">
            <label htmlFor="tablename" className="text-base font-medium">
              Title
            </label>
            <input
              placeholder="Enter Tax Title"
              id="tablename"
              autoComplete="off"
              className=" text-sm w-full px-3 py-2 rounded-[5px] border-[1px] border-gray-300 outline-blue-400 mb-4 required"
              type="text"
              value={taxTitel}
              onChange={(e) => setTaxTitle(e.target.value)}
            ></input>

            <label className="text-base font-medium">Rate</label>
            <input
              placeholder="Enter Tax Rate"
              type="number"
              className=" text-sm w-full px-3 py-2 rounded-[5px] border-[1px] border-gray-300 outline-blue-400 mb-4 required"
              autoComplete="off"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
            ></input>

            <div className="flex flex-row gap-2 items-center justify-end">
              <span
                className="text-gray-500 font-semibold flex items-center gap-1 bg-gray-200 rounded-lg p-2 cursor-pointer transition-all hover:bg-gray-300"
                onClick={() => setTaxOverlay(false)}
              >
                Close
              </span>
              <button
                disabled={!taxTitel || !taxRate ? true : false}
                onClick={() => handleTaxsSubmit}
                type="submit"
                className={`font-semibold bg-greenBtn text-white rounded-lg p-2 transition-all 
                        ${
                          !taxTitel || !taxRate
                            ? "opacity-35"
                            : "hover:bg-greenBtnHover cursor-pointer"
                        }  `}
              >
                Add Tax
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex flex-col p-4 flex-[1]">
        <span className="flex flex-row items-center gap-5 mb-5">
          <h1 className="text-xl font-semibold">Store Tables</h1>
          <button
            onClick={() => setTaxOverlay(true)}
            className="font-bold text-gray-500 flex items-center justify-center gap-2 bg-[#f9f9fa] cursor-pointer transition-all hover:bg-gray-200 border-[1px] rounded-xl px-2 py-1"
          >
            + New
          </button>
        </span>

        {loading ? (
          <Loading />
        ) : (
          <table className="table-auto border-2">
            <thead className="border-b-[1px]">
              <tr className="text-gray-500 bg-gray-200 *:text-sm *:text-start *:p-2 ">
                <th>ID</th>
                <th className="w-2/4">Title</th>
                <th>Rate</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-xs font-semibold [&>*:nth-child(even)]:bg-gray-100">
              {taxs.length === 0
                ? "Add your taxs here."
                : taxs.map((item) => (
                    <tr className="*:p-2" key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.taxTitel}</td>
                      <td>{item.taxRate}%</td>
                      <td>
                        <RiDeleteBinLine
                          size={15}
                          onClick={() => handleTaxDelete(item.id)}
                          className="text-[red] cursor-pointer"
                        />
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default TaxSetup;
