import React, { useEffect, useState } from "react";
import { BiDetail } from "react-icons/bi";
import { IoEllipsisVertical } from "react-icons/io5";
import axios from "axios";
import { TbRefresh } from "react-icons/tb";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { MdOutlineAccessTime } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

const Kitchen = () => {
  const [kitchen, setKitchen] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const fetchKitchen = async () => {
      try {
        const responseOrders = await axios.get("http://localhost:3600/orders");
        const responseTables = await axios.get("http://localhost:3600/tables");

        setKitchen(responseOrders.data);
        setTables(responseTables.data);
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

    fetchKitchen();
  }, [refresh]);

  const handleTableEdit = async (id) => {
    const tempOrder = kitchen.find((item) => item.id === id);

    const tempTable = tables.find((item) => item.name === tempOrder.table);
    if (tempTable) {
      const updatedTable = {
        ...tempTable,
        occupied: false,
      };
      try {
        const response = await axios.put(
          `http://localhost:3600/tables/${updatedTable.id}`,
          updatedTable
        );
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:3600/orders/${id}`);
      const temporders = kitchen.filter((item) => item.id !== id);
      setKitchen(temporders);
      handleTableEdit(id);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleRefresh = () => {
    setRefresh(true);

    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  const handleEditItemReady = async (id1, id2, status) => {
    const findOrder = kitchen.find((item) => item.id === id1);
    const tempItem = findOrder.data.find((item) => item.id === id2);
    const ItemOrder = findOrder.data.indexOf(tempItem);
    /* const tempData = findOrder.data.filter((item) => item.id !== id2); */

    const updatedItem = { ...tempItem, status: status };
    /* const updatedData = [updatedItem, ...new Set(tempData)]; */
    findOrder.data[ItemOrder] = updatedItem;

    /* const updatedOrder = { ...findOrder, data: tempData }; */
    const updatedOrder = { ...findOrder, data: findOrder.data };

    /*   console.log("updatedOrder", updatedOrder); */
    try {
      const response = await axios.put(
        `http://localhost:3600/orders/${id1}`,
        updatedOrder
      );
      handleRefresh();
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <>
      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center gap-10 mb-6">
          <h1 className="text-2xl font-semibold ">Kitchen</h1>
          <button
            className="flex flex-row items-center gap-2 text-base text-gray-500 bg-[#f9f9fa] border-[1px] rounded-lg px-2 py-1 font-medium
          hover:bg-gray-200 transition-all"
            onClick={() => handleRefresh()}
          >
            <TbRefresh
              size={25}
              className={
                refresh === true ? "animate-spin-reverse" : "animate-none"
              }
            />{" "}
            Refresh
          </button>
        </div>

        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* item */}
            {kitchen && kitchen.length === 0
              ? "No Orders Yet"
              : kitchen
                  .filter((order) => order.ready == false)
                  .map((order) => (
                    <div
                      key={order.id}
                      className="flex flex-col border-[1px] rounded-2xl p-4 gap-4"
                    >
                      <div className="flex flex-row justify-between items-center">
                        <span className="flex flex-row items-center gap-3">
                          <span className="flex justify-center items-center bg-gray-100 text-gray-500 p-3 rounded-full">
                            <BiDetail size={25} />
                          </span>
                          <span className="text-base font-bold">
                            {order.customer}
                          </span>
                        </span>
                        <span className="text-base font-bold">
                          Token: {order.id}
                        </span>
                      </div>

                      <div className=" rounded-2xl ">
                        <div className="flex flex-col">
                          {order.data.map((item) => (
                            <div
                              key={item.id}
                              className="flex flex-row items-center justify-between pb-2 pt-2 border-b-[1px] last:border-0"
                            >
                              <span className="flex flex-col">
                                <span className="flex flex-row items-center gap-2 text-base">
                                  {item.status === "Preparing" ? (
                                    <MdOutlineAccessTime
                                      size={20}
                                      className="text-[#f6b11d]"
                                    />
                                  ) : item.status === "Ready" ? (
                                    <FaCheck
                                      size={20}
                                      className="text-greenBtn"
                                    />
                                  ) : null}
                                  {item.name} x {item.qty}
                                </span>
                                <span className="text-sm text-gray-500">
                                  <i>{item.notes ? item.notes : ""} </i>
                                </span>
                              </span>

                              {item.status === "" ? (
                                <button
                                  onClick={() =>
                                    handleEditItemReady(
                                      order.id,
                                      item.id,
                                      "Preparing"
                                    )
                                  }
                                  className="text-sm bg-gray-100 p-2 rounded-md hover:bg-gray-200 font-medium"
                                >
                                  Start Making
                                </button>
                              ) : item.status === "Preparing" ? (
                                <button
                                  onClick={() =>
                                    handleEditItemReady(
                                      order.id,
                                      item.id,
                                      "Ready"
                                    )
                                  }
                                  className="text-sm bg-gray-100 p-2 rounded-md hover:bg-gray-200 font-medium"
                                >
                                  complete
                                </button>
                              ) : null}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Kitchen;
