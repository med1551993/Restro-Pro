import React, { useEffect, useState, useRef } from "react";
import { BiDetail } from "react-icons/bi";
import { IoEllipsisVertical } from "react-icons/io5";
import axios from "axios";
import { TbRefresh } from "react-icons/tb";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { MdOutlinePayments } from "react-icons/md";
import { MdOutlineAccessTime } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { format } from "date-fns";
import { Link, Route, Routes } from "react-router-dom";
import OrderReceipt from "./OrderReceipt";
import DeleteOverlay from "./DeleteOverlay";
import Loading from "./Loading";
import { enqueueSnackbar } from "notistack";
import Error from "./Error";
import noOrdersYet from "../images/noOrdersYet.png";

const Orders = () => {
  const orderIdRef = useRef();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [kitchen, setKitchen] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [tables, setTables] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [receiptOverlay2, setReceiptOverlay2] = useState(false);

  const [ordersStatus, setOrdersStatus] = useState("IDLE");

  const handleSnackBar = (message, type) => {
    enqueueSnackbar(message, { variant: type });
  };

  const handleRefresh = (message, type) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 500);

    setTimeout(() => {
      handleSnackBar(message, type);
    }, 500);

    setRefresh(true);

    setTimeout(() => {
      setRefresh(false);
    }, 500);
  };

  useEffect(() => {
    const fetchKitchen = async () => {
      setOrdersStatus("LOADING");
      try {
        const responseOrders = await axios.get("http://localhost:3600/orders");
        const responseTables = await axios.get("http://localhost:3600/tables");
        const responseInvoices = await axios.get(
          "http://localhost:3600/invoices"
        );

        setKitchen(responseOrders.data);
        setTables(responseTables.data);
        setInvoices(responseInvoices.data);
        setOrdersStatus("IDLE");
      } catch (err) {
        setOrdersStatus("ERROR");
        console.log("orderstatus", ordersStatus);
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

  const handleDeleteInvoice = async (OrderId) => {
    const tempInvoice = invoices.find((item) => item.data.id === OrderId);

    try {
      await axios.delete(`http://localhost:3600/invoices/${tempInvoice.id}`);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleDeleteModal = async (id) => {
    setModal(true);
    orderIdRef.current = id;
  };

  const handleDeleteOrder = async (message, type) => {
    setModal(false);
    try {
      await axios.delete(`http://localhost:3600/orders/${orderIdRef.current}`);
      const temporders = kitchen.filter(
        (item) => item.id !== orderIdRef.current
      );

      /*  setKitchen(temporders); */
      handleTableEdit(orderIdRef.current);
      handleDeleteInvoice(orderIdRef.current);
      handleRefresh(message, type);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleDeleteOrderLastItem = async (id, message, type) => {
    try {
      await axios.delete(`http://localhost:3600/orders/${id}`);
      const temporders = kitchen.filter((item) => item.id !== id);

      /*  setKitchen(temporders); */
      handleTableEdit(id);
      handleDeleteInvoice(id);
      handleRefresh(message, type);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleEditInvoice = async (orderId, itemId) => {
    const tempInvoice = invoices.find((item) => item.data.id === orderId);
    const tempArray = tempInvoice.data.data.filter(
      (item) => item.id !== itemId
    );
    const updatedData = { ...tempInvoice.data, data: tempArray };
    const updatedInvoice = { ...tempInvoice, data: updatedData };

    try {
      await axios.put(
        `http://localhost:3600/invoices/${updatedInvoice.id}`,
        updatedInvoice
      );
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleEditItemReady = async (id1, id2, status, message, type) => {
    const findOrder = kitchen.find((item) => item.id === id1);
    const tempItem = findOrder.data.find((item) => item.id === id2);
    const ItemOrder = findOrder.data.indexOf(tempItem);
    const updatedItem = { ...tempItem, status: status };
    findOrder.data[ItemOrder] = updatedItem;
    const updatedOrder = { ...findOrder, data: findOrder.data };

    try {
      const response = await axios.put(
        `http://localhost:3600/orders/${id1}`,
        updatedOrder
      );

      handleRefresh(message, type);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleReadyOrder = async (orderId) => {
    const tempOrder = kitchen.find((item) => item.id === orderId);
    const updatedOrder = { ...tempOrder, ready: true };
    updatedOrder.data.map((item) =>
      handleEditItemReady(
        tempOrder.id,
        item.id,
        "Ready",
        "Item Status Updated",
        "success"
      )
    );

    try {
      const response = await axios.put(
        `http://localhost:3600/orders/${orderId}`,
        updatedOrder
      );

      handleRefresh("Order Status Updated", "success");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleReadyPaied = async (orderId) => {
    const tempOrder = kitchen.find((item) => item.id === orderId);
    const updatedOrder = { ...tempOrder, paid: true, ready: true };

    try {
      const response = await axios.put(
        `http://localhost:3600/orders/${orderId}`,
        updatedOrder
      );
      handleRefresh("Order Status Updated", "success");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleEditItemDelete = async (id1, id2, message, type) => {
    const findOrder = kitchen.find((item) => item.id === id1);
    const tempData = findOrder.data.filter((item) => item.id !== id2);
    const updatedOrder = { ...findOrder, data: tempData };
    try {
      const response = await axios.put(
        `http://localhost:3600/orders/${id1}`,
        updatedOrder
      );

      if (updatedOrder.data.length === 0) {
        handleDeleteOrderLastItem(id1, "Order Cancelled Successfully", "error");
      } else {
        setKitchen(
          kitchen.map((item) => (item.id === id1 ? { ...response.data } : item))
        );
      }
      handleSnackBar(message, type);
      handleEditInvoice(id1, id2);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const getDate = () => {
    const date = format(new Date(), "dd/MM/yyyy HH:mm:ss");

    return date;
  };
  useEffect(() => {
    getDate();
  }, [receiptOverlay2]);

  if (ordersStatus == "ERROR") return <Error />;
  if (ordersStatus == "LOADING") return <Loading />;

  return (
    <>
      {/*Delete Overlay*/}
      {modal && (
        <DeleteOverlay
          setModal={setModal}
          handleDeleteOrder={handleDeleteOrder}
        />
      )}
      {/* /***************************************************************** */}

      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center gap-10 mb-6">
          <h1 className="text-2xl font-semibold ">Orders</h1>
          <button
            className="flex flex-row items-center gap-2 text-base text-gray-500 bg-[#f9f9fa] border-[1px] rounded-lg px-2 py-1 font-medium
          hover:bg-gray-200 transition-all"
            onClick={() => handleRefresh("Orders Loaded!", "default")}
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

        {loading == true ? (
          <Loading />
        ) : (
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 w-full h-ful">
              {/* item */}
              {kitchen &&
              kitchen.filter(
                (order) => order.paid == false || order.ready == false
              ).length === 0 ? (
                <div className="flex items-end justify-end w-full h-full col-span-4">
                  <div className="flex flex-col items-center mr-auto ml-auto">
                    <img
                      className="block w-dull"
                      src={noOrdersYet}
                      alt="noOrdersYet"
                    />
                    <p className="text-gray-500">No Orders Pending!</p>
                  </div>
                </div>
              ) : (
                kitchen
                  .filter(
                    (order) => order.paid == false || order.ready == false
                  )
                  .map((order) => (
                    <div
                      key={order.id}
                      className="flex flex-col border-[1px] rounded-2xl p-4 gap-4"
                    >
                      <div className="flex flex-row justify-between items-center">
                        <span className="flex flex-row items-center gap-3">
                          <span className="flex justify-center items-center bg-gray-100 text-gray-500 p-3 rounded-full">
                            <BiDetail size={20} />
                          </span>
                          <span className="text-base font-bold">
                            {order.diningOption === "Dine in"
                              ? order.table
                              : order.diningOption}
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
                            className="absolute z-50  right-0 w-[10rem] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                          >
                            <div className="py-1">
                              <MenuItem>
                                <Link
                                  to={`./${order.id}`}
                                  className="flex flex-row gap-2 items-center text-start text-gray-700 w-full px-4 py-2 text-sm font-semibold data-[focus]:bg-gray-100"
                                >
                                  <BiDetail size={15} />
                                  Print Receipt
                                </Link>
                              </MenuItem>
                              <MenuItem>
                                <button
                                  onClick={() => handleReadyOrder(order.id)}
                                  className="text-start text-green-600 w-full block px-4 py-2 text-sm font-semibold data-[focus]:bg-gray-100"
                                >
                                  ✓&nbsp; Ready
                                </button>
                              </MenuItem>
                              <MenuItem>
                                <button
                                  onClick={() => handleDeleteModal(order.id)}
                                  className="text-start text-red-400 w-full block px-4 py-2 text-sm font-semibold data-[focus]:bg-gray-100 "
                                >
                                  X &nbsp;Cancel
                                </button>
                              </MenuItem>
                              {order.paid == false && (
                                <MenuItem>
                                  <button
                                    onClick={() => handleReadyPaied(order.id)}
                                    className="flex flex-row gap-2 items-center text-start text-gray-700 w-full px-4 py-2 text-sm font-semibold data-[focus]:bg-gray-100"
                                  >
                                    <MdOutlinePayments size={15} />
                                    Pay & Complete
                                  </button>
                                </MenuItem>
                              )}
                            </div>
                          </MenuItems>
                        </Menu>
                      </div>

                      <div className="p-4 rounded-2xl bg-gray-100 border-t-[1px]">
                        <div className="flex flex-row items-center justify-between mb-4">
                          <div className="flex flex-col gap-1">
                            <span>Token:</span>
                            <span className="text-white bg-blue-950 rounded-[50%] p-3 flex justify-center items-center text-base font-semibold">
                              {/* {kitchen.indexOf(order) + 1} */}
                              {order.id}
                            </span>
                          </div>

                          <div className="flex flex-col items-end gap-1 text-sm">
                            <span className="font-semibold">{order.time}</span>
                            <span className="flex flex-row items-center gap-2 text-gray-500">
                              <MdOutlinePayments />
                              <p className="text-gray-500">
                                {order.paid == false ? "pending" : "paid"}
                              </p>
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
                                <span className="text-base flex flex-row items-center gap-2">
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
                                  className="absolute z-50 right-0 w-[10rem] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                  <div className="py-1">
                                    <MenuItem>
                                      <button
                                        onClick={() =>
                                          handleEditItemReady(
                                            order.id,
                                            item.id,
                                            "Preparing",
                                            "Item Status updated",
                                            "success"
                                          )
                                        }
                                        className=" flex flex-row items-center gap-2 text-start text-[#f6b11d] w-full px-4 py-2 text-sm font-semibold data-[focus]:bg-gray-100"
                                      >
                                        <MdOutlineAccessTime size={15} />{" "}
                                        Preparing
                                      </button>
                                    </MenuItem>
                                    <MenuItem>
                                      <button
                                        onClick={() =>
                                          handleEditItemReady(
                                            order.id,
                                            item.id,
                                            "Ready",
                                            "Item Status updated",
                                            "success"
                                          )
                                        }
                                        className="text-start text-green-600 w-full block px-4 py-2 text-sm font-semibold data-[focus]:bg-gray-100"
                                      >
                                        ✓&nbsp; Ready
                                      </button>
                                    </MenuItem>
                                    <MenuItem>
                                      <button
                                        onClick={() =>
                                          handleEditItemDelete(
                                            order.id,
                                            item.id,
                                            "Items Canceled successfully",
                                            "error"
                                          )
                                        }
                                        className="text-start text-red-400 w-full block px-4 py-2 text-sm font-semibold data-[focus]:bg-gray-100 "
                                      >
                                        X &nbsp;Cancel
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
                  ))
              )}
              <Routes>
                <Route
                  path="/:id"
                  element={<OrderReceipt kitchen={kitchen} getDate={getDate} />}
                />
              </Routes>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
