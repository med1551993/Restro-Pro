import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
const EditMenu = ({
  tables,
  tableName,
  setTableName,
  tableFloor,
  setTableFloor,
  tableCapacity,
  setTableCapacity,
  handleEditTable,
}) => {
  const { id } = useParams();
  console.log("id", id);
  const table = tables.find((item) => item.id === id);
  const navigate = useNavigate();

  useEffect(() => {
    if (table) {
      setTableName(table.name);
      setTableFloor(table.floor);
      setTableCapacity(table.capacity);
    }
  }, []);

  return (
    <>
      {/* Overlay Edit */}
      <div
        className="absolute flex
        items-center justify-center top-0 left-0 z-99999999 w-full h-full bg-black/50"
      >
        <div className="flex flex-col gap-6 w-[30rem] h-auto bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-extrabold">Adding new Menu</h2>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-4"
          >
            <label htmlFor="editedTablename" className="text-base font-medium">
              Title
            </label>
            <input
              autoComplete="off"
              id="editedTablename"
              required
              className=" text-sm w-full px-3 py-2 rounded-[5px] border-[1px] border-gray-300 outline-blue-400 mb-4 required"
              type="text"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
            ></input>

            <label htmlFor="editedcapacity" className="text-base font-medium">
              Seating Capacity
            </label>
            <input
              autoComplete="off"
              required
              id="editedcapacity"
              type="text"
              className=" text-sm w-full px-3 py-2 rounded-[5px] border-[1px] border-gray-300 outline-blue-400 mb-4 required"
              value={tableCapacity}
              onChange={(e) => setTableCapacity(e.target.value)}
            ></input>

            <label htmlFor="editedFloor" className="text-base font-medium">
              Table's Floor
            </label>
            <input
              autoComplete="off"
              required
              id="editedFloor"
              type="text"
              className=" text-sm w-full px-3 py-2 rounded-[5px] border-[1px] border-gray-300 outline-blue-400 mb-4 required"
              value={tableFloor}
              onChange={(e) => setTableFloor(e.target.value)}
            ></input>

            <div className="flex flex-row gap-2 items-center justify-end">
              <span
                onClick={() => {
                  navigate(-1);
                  setTableName("");
                  setTableFloor("");
                  setTableCapacity("");
                }}
                className="text-gray-500 font-semibold flex items-center gap-1 bg-gray-200 rounded-lg p-2 cursor-pointer transition-all hover:bg-gray-300"
              >
                Close
              </span>
              <button
                disabled={
                  !tableName || !tableFloor || !tableCapacity ? true : false
                }
                onClick={() => handleEditTable(table.id)}
                type="submit"
                className={`font-semibold bg-greenBtn text-white rounded-lg p-2 transition-all 
                           ${
                             !tableName || !tableFloor || !tableCapacity
                               ? "opacity-35"
                               : "hover:bg-greenBtnHover cursor-pointer"
                           }  `}
              >
                Edit Table
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditMenu;
