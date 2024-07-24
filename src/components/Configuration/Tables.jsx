import React, { useState } from "react";
import { tables } from "../../DummyDate";
import { TbArmchair2 } from "react-icons/tb";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import deleteFromTable from "../../store/userSlice";

const Tables = ({ data }) => {
  const dispatch = useDispatch();

  const [TableOverlay, setTableOverlay] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTableOverlay(false);
  };
  return (
    <>
      {/* Overlay */}
      <div
        className={`absolute ${
          TableOverlay ? "flex" : "hidden"
        } items-center justify-center top-0 left-0 z-99999999 w-full h-full bg-black/50`}
      >
        <div className="flex flex-col gap-6 w-[30rem] h-auto bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-extrabold">Adding new Table</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label htmlFor="username" className="text-[1.1rem] font-medium">
              Table's Number
            </label>
            <input
              id="username"
              autoComplete="off"
              className="bg-[#f2f2f2] w-full px-3 py-2 rounded-md border-none outline-none mb-4 required"
              type="text"
            ></input>

            <label className="text-[1.1rem] font-medium">Capacity</label>
            <input
              type="text"
              className="bg-[#f2f2f2] w-full px-3 py-2 rounded-s-md border-none outline-none mb-4 required"
              autoComplete="off"
            ></input>

            <label className="text-[1.1rem] font-medium">Floor's Number</label>
            <input
              type="text"
              className="bg-[#f2f2f2] w-full px-3 py-2 rounded-s-md border-none outline-none mb-4 required"
              autoComplete="off"
            ></input>
            <div className="flex flex-row gap-2 items-center justify-end">
              <button
                className="text-gray-500 font-semibold flex items-center gap-1 bg-gray-200 rounded-lg p-2 cursor-pointer transition-all hover:bg-gray-300"
                onClick={() => setTableOverlay(false)}
              >
                Close
              </button>
              <button
                type="submit"
                className="font-semibold bg-greenBtn text-white rounded-lg p-2 cursor-pointer transition-all 
                 hover:bg-greenBtnHover"
              >
                Add Table
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex flex-col p-4 flex-[1]">
        <span className="flex flex-row items-center gap-5 mb-5">
          <h1 className="text-xl font-semibold">Store Tables</h1>
          <button
            onClick={() => setTableOverlay(true)}
            className="font-bold text-gray-500 flex items-center justify-center gap-2 bg-[#f9f9fa] cursor-pointer transition-all hover:bg-gray-200 border-2 rounded-xl px-2 py-1"
          >
            + New
          </button>
        </span>

        <div className="grid grid-cols-3 gap-4">
          {!data
            ? "Add your tables here."
            : data.tables.map((item) => (
                <div
                  className="flex flex-row gap-2 rounded-2xl border-2 p-2"
                  key={item.id}
                >
                  <span className="flex justify-center items-center bg-gray-100 rounded-full h-auto text-gray-500 p-5">
                    <TbArmchair2 />{" "}
                  </span>
                  <div className="flex flex-row items-center justify-between flex-[1]">
                    <span className="flex flex-col">
                      <span className="font-medium">{item.name}</span>
                      <span className="font-medium text-gray-500 text-sm">
                        Setting Capacity: {item.capacity}
                      </span>
                    </span>
                    <span className="flex felx-row items-center gap-2">
                      <span className="font-medium text-gray-500 cursor-pointer">
                        <MdOutlineModeEdit size={20} />
                      </span>
                      <span className="font-medium">
                        <RiDeleteBinLine
                          onClick={() => dispatch(deleteFromTable(item))}
                          className="text-[red] cursor-pointer"
                        />
                      </span>
                    </span>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default Tables;
