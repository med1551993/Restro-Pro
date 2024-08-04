import React, { useEffect, useState } from "react";
import { BiDetail } from "react-icons/bi";
import { IoEllipsisVertical } from "react-icons/io5";
import axios from "axios";
import { TbRefresh } from "react-icons/tb";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const Orders = () => {
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

  const handleEditItem = async (id1, id2) => {
    const findOrder = kitchen.find((item) => item.id === id1);
    const tempData = findOrder.data.filter((item) => item.id !== id2);
    const updatedOrder = { ...findOrder, data: tempData };
    try {
      const response = await axios.put(
        `http://localhost:3600/orders/${id1}`,
        updatedOrder
      );

      if (updatedOrder.data.length === 0) {
        handleDeleteOrder(id1);
      } else {
        setKitchen(
          kitchen.map((item) => (item.id === id1 ? { ...response.data } : item))
        );
      }
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleRefresh = () => {
    setRefresh(true);
    console.log("refresh", refresh);

    setTimeout(() => {
      setRefresh(false);
      console.log("refresh", refresh);
    }, 1000);
  };

  return (
    <>
      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center gap-10 mb-6">
          <h1 className="text-3xl font-semibold ">Orders</h1>
          <button
            className="flex flex-row items-center gap-2 text-lg text-gray-500 bg-[#f9f9fa] border-2 rounded-lg px-2 py-1 font-bold
          hover:bg-gray-200 transition-all"
            onClick={() => handleRefresh()}
          >
            <TbRefresh
              size={25}
              className={refresh === true ? "animate-spin" : "animate-none"}
            />{" "}
            Refresh
          </button>
        </div>

        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* item */}
            {kitchen && kitchen.length === 0
              ? "No Orders Yet"
              : kitchen.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col border-2 rounded-2xl p-4 gap-4"
                  >
                    <div className="flex flex-row justify-between items-center">
                      <span className="flex flex-row items-center gap-3">
                        <span className="flex justify-center items-center bg-gray-100 text-gray-500 p-3 rounded-full">
                          <BiDetail size={25} />
                        </span>
                        <span className="text-xl font-extrabold">
                          {order.diningOption}
                        </span>
                      </span>

                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <MenuButton className=" hover:cursor-pointer active:bg-gray-200 p-2 rounded-full">
                            <IoEllipsisVertical />
                          </MenuButton>
                        </div>

                        <MenuItems
                          transition
                          className="absolute right-0  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                          <div className="py-1">
                            <MenuItem>
                              <button
                                onClick={() => handleDeleteOrder(order.id)}
                                className="text-start w-full block px-4 py-2 text-base font-semibold text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                              >
                                Delete
                              </button>
                            </MenuItem>
                          </div>
                        </MenuItems>
                      </Menu>
                    </div>

                    <div className="p-4 rounded-2xl bg-gray-100 border-t-2">
                      <div className="flex flex-row items-center justify-between mb-4">
                        <div className="flex flex-col gap-1">
                          <span>Token:</span>
                          <span className="text-white bg-blue-950 rounded-full p-3 flex justify-center items-center font-bold">
                            {kitchen.indexOf(order) + 1}
                          </span>
                        </div>

                        <div className="flex flex-col gap-1">
                          <span className="font-bold">{order.time}</span>
                          <span>
                            <p className="text-gray-500">pending</p>{" "}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        {order.data.map((item) => (
                          <div
                            key={item.id}
                            className="flex flex-row items-center justify-between pb-4 pt-4 border-b-2 last:border-0"
                          >
                            <span className="flex flex-col">
                              <span>
                                {" "}
                                {item.name} x {item.qty}
                              </span>
                              <span className="text-sm text-gray-500">
                                <i>{item.notes ? item.notes : ""} </i>
                              </span>
                            </span>

                            <Menu
                              as="div"
                              className="relative inline-block text-left"
                            >
                              <div>
                                <MenuButton className=" hover:cursor-pointer active:bg-gray-200 p-2 rounded-full">
                                  <IoEllipsisVertical />
                                </MenuButton>
                              </div>

                              <MenuItems
                                transition
                                className="absolute right-0  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                              >
                                <div className="py-1">
                                  <MenuItem>
                                    <button
                                      onClick={() =>
                                        handleEditItem(order.id, item.id)
                                      }
                                      className="le text-start w-full block px-4 py-2 text-base font-semibold text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                    >
                                      Delete
                                    </button>
                                  </MenuItem>
                                </div>
                              </MenuItems>
                            </Menu>
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

export default Orders;
