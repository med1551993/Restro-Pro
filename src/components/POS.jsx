import React, { useEffect, useState, useRef } from "react";
import { IoRestaurantOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegNoteSticky } from "react-icons/fa6";
import { FaRegSave } from "react-icons/fa";
import { LuChefHat } from "react-icons/lu";
import { MdOutlinePayments } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  toggleCartQty,
  setDining_option,
  setTable_option,
  setNotes,
  getTotalTax,
  getCartTotal,
  clearCart,
} from "../store/cartSlice";
import axios from "axios";
import { Link, Route, Routes } from "react-router-dom";
import EditNotes from "./EditNotes";
import { format } from "date-fns";
import ReactPrint from "react-to-print";
import { BiFilterAlt } from "react-icons/bi";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Loading from "./Loading";

const POS = ({ user }) => {
  const ref = useRef();
  const [menu, setMenu] = useState([]);
  const [menuSearch, setMenuSearch] = useState([]);
  const [search, setSearch] = useState("");

  const [tables, setTables] = useState([]);

  const [diningOption, setDiningOption] = useState("");
  const [tableOption, setTableOption] = useState("");

  const [kitchenOverlay, setKitchenOverlay] = useState(false);
  const [receiptOverlay, setReceiptOverlay] = useState(false);

  const [customer, setCustomer] = useState([]);
  const [customerSearch, setCustomerSearch] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [showCustomerMenu, setShowCustomerMenu] = useState(false);

  const [categoryFilter, setCategoryFilter] = useState("All");

  const [message, setMessage] = useState("");

  const [receipt, setReceipt] = useState();
  const [loading, setLoading] = useState(false);

  const [printSettings, setPrintSettings] = useState([]);

  const dispatch = useDispatch();

  const {
    data: cartItems,
    Dining_Option,
    table_option,
    totalItems,
    totalTax,
    totalAmount,
  } = useSelector((store) => store.cart);

  const handleBlur = () => {
    setTimeout(() => {
      setShowCustomerMenu(false);
    }, 100);
  };
  const addToCartHandler = (item) => {
    const tempItem = {
      ...item,
      qty: 1,
      notes: "",
      status: "",
    };
    dispatch(addToCart(tempItem));
  };

  const addInvoiceshandler = async (OrderId) => {
    try {
      const response = await axios.get(
        `http://localhost:3600/orders/${OrderId}`
      );
      await axios.post("http://localhost:3600/invoices", {
        data: response.data,
      });
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleKitchenSubmit = async () => {
    const date = format(new Date(), "PP");
    const time = format(new Date(), "HH:mm bb");
    const date2 = format(new Date(), "yyyy-MM-dd");

    const order = {
      data: cartItems,
      table: tableOption,
      diningOption: diningOption,
      time: time,
      date: date,
      date2: date2,
      customer: selectedCustomer,
      ready: false,
      paid: false,
    };

    try {
      const response = await axios.post("http://localhost:3600/orders", order);

      addInvoiceshandler(response.data.id);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  const handleKitchenSubmitPaid = async () => {
    const date = format(new Date(), "PP");
    const time = format(new Date(), "HH:mm bb");
    const date2 = format(new Date(), "yyyy-MM-dd");

    const order = {
      data: cartItems,
      table: tableOption,
      diningOption: diningOption,
      time: time,
      date: date,
      date2: date2,
      customer: selectedCustomer,
      ready: false,
      paid: true,
    };

    try {
      const response = await axios.post("http://localhost:3600/orders", order);

      addInvoiceshandler(response.data.id);
      setReceipt(response.data);

      setLoading(true);

      setTimeout(() => {
        setLoading(false);
      }, 700);

      setReceiptOverlay(true);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handlePayAndSendtokitchen = () => {
    handleKitchenSubmitPaid();
    dispatch(clearCart());
    setDiningOption("");
    setTableOption("");
    setSelectedCustomer("");
    setKitchenOverlay(false);
  };

  const sendToKitchenHandler = () => {
    handleKitchenSubmit();
    dispatch(clearCart());
    setDiningOption("");
    setTableOption("");
    setSelectedCustomer("");
    setKitchenOverlay(false);
  };

  const handleTableEdit = async () => {
    const tempTable = tables.find((item) => item.name === tableOption);
    if (tempTable) {
      const updatedTable = {
        ...tempTable,
        occupied: true,
      };
      try {
        const response = await axios.put(
          `http://localhost:3600/tables/${updatedTable.id}`,
          updatedTable
        );
        setTables(tables.filter((item) => item.id !== updatedTable.id));
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const responseMenu = await axios.get("http://localhost:3600/menu");
        const responseTable = await axios.get("http://localhost:3600/tables");
        const responseCustomer = await axios.get(
          "http://localhost:3600/customers"
        );
        const pritSettingResponse = await axios.get(
          "http://localhost:3600/printSettings"
        );
        setMenu(responseMenu.data);
        setTables(responseTable.data);
        setCustomer(responseCustomer.data);
        setPrintSettings(pritSettingResponse.data[0]);
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

    fetch();
  }, []);

  useEffect(() => {
    const handleSearchCustomer = () => {
      if (!selectedCustomer) {
        setCustomerSearch([]);
        setShowCustomerMenu(false);
        return;
      }

      if (selectedCustomer.length > 0 && !showCustomerMenu) {
        setShowCustomerMenu(true);
      }
      const tempCustomers = customer?.filter((item) =>
        item.name.toLowerCase().includes(selectedCustomer.toLowerCase())
      );
      setCustomerSearch(tempCustomers);
    };
    handleSearchCustomer();
  }, [customer, selectedCustomer]);

  useEffect(() => {
    const filteredMenu = menu?.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setMenuSearch(filteredMenu);
  }, [menu, search]);

  const getDate = () => {
    const date = format(new Date(), "dd/MM/yyyy HH:mm:ss");

    return date;
  };
  useEffect(() => {
    getDate();
  }, [receiptOverlay]);

  const handleKitchenOverlay = (option) => {
    setMessage(option);
    setKitchenOverlay(true);
  };
  return (
    <>
      {/* Receipt overlay */}
      <div
        className={`absolute ${
          receiptOverlay ? "flex" : "hidden"
        } flex-col items-center justify-center gap-2 top-0 left-0 z-50 w-full h-full bg-black/50`}
      >
        {loading == true ? (
          <Loading />
        ) : (
          <>
            <div
              className="w-96 rounded bg-gray-50 px-6 pt-8 shadow-lg"
              ref={ref}
            >
              {printSettings.storeDetails == true ? (
                <div className="flex flex-col justify-center items-center gap-2  border-b border-dashed py-2">
                  <h4 className="font-semibold uppercase">{user.storeName}</h4>
                  <p className="text-xs uppercase">{user.address}</p>
                  <p className="text-xs uppercase">
                    Phone:{user.phone}, Email: {user.email}
                  </p>
                </div>
              ) : null}
              <p className="text-xs uppercase text-center border-b border-dashed py-2">
                {printSettings.header}
              </p>
              <div className="flex flex-col gap-3 border-b border-dashed py-6 text-xs">
                <p className="flex justify-between">
                  <span className="text-gray-400">Receipt No.:</span>
                  <span>{receipt?.id}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-400">Order Type:</span>
                  <span>{receipt?.diningOption}</span>
                </p>
                {printSettings.customerDetails == true ? (
                  <p className="flex justify-between">
                    <span className="text-gray-400">Customer:</span>
                    <span>{receipt?.customer}</span>
                  </p>
                ) : null}

                <p className="flex justify-between">
                  <span className="text-gray-400">Date:</span>
                  <span>{getDate()}</span>
                </p>
              </div>
              <div className="flex flex-col gap-3 pb-6 pt-2 text-xs">
                <table className="w-full text-left">
                  <thead>
                    <tr className="flex">
                      <th className="w-full py-2">Product</th>
                      <th className="min-w-[44px] py-2">QTY</th>
                      <th className="min-w-[44px] py-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {receipt?.data.map((item) => (
                      <tr key={item.id} className="flex">
                        <td className="flex-1 py-1">{item.name}</td>
                        <td className="min-w-[44px]">{item.qty}</td>
                        <td className="min-w-[44px]">
                          {user.currency}
                          {item.price * item.qty}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className=" border-b border-dashed"></div>
                <div className="flex flex-row items-center justify-end p-2 ">
                  <div className="flex flex-col">
                    <div className="font-medium text-xs">
                      <span className="min-w-[44px] ">Total Tax</span>
                      <span>
                        {" "}
                        {user.currency}
                        {receipt?.data.reduce((cartTax, cartItem) => {
                          return (cartTax =
                            cartTax +
                            ((cartItem.price * cartItem.tax) / 100) *
                              cartItem.qty);
                        }, 0)}
                      </span>
                    </div>
                    <div className="font-bold text-lg">
                      <span className="min-w-[44px] ">Total</span>
                      <span>
                        {" "}
                        {user.currency}
                        {receipt?.data.reduce((cartTotal, cartItem) => {
                          return (cartTotal =
                            cartTotal + cartItem.price * cartItem.qty);
                        }, 0) +
                          receipt?.data.reduce((cartTax, cartItem) => {
                            return (cartTax =
                              cartTax +
                              ((cartItem.price * cartItem.tax) / 100) *
                                cartItem.qty);
                          }, 0)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="py-4 flex flex-col justify-center items-center gap-2  ">
                  <p className=" border-b border-dashed w-full text-center uppercase">
                    {printSettings.footer}
                  </p>
                  <p className="text-center py-4 ">
                    for all your complaints call: <br /> 548976548
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-2 items-center justify-end w-96">
              <button
                className="text-gray-500 font-semibold flex items-center gap-1 bg-gray-200 rounded-lg p-2 cursor-pointer transition-all hover:bg-gray-300"
                onClick={() => setReceiptOverlay(false)}
              >
                Close
              </button>
              <ReactPrint
                trigger={() => (
                  <button className="font-semibold bg-greenBtn text-white rounded-lg p-2 cursor-pointer transition-all  hover:bg-greenBtnHover">
                    Print
                  </button>
                )}
                content={() => ref.current}
                documentTitle={`receipt ${receipt?.id}`}
              />
            </div>
          </>
        )}
      </div>

      {/* Overlay */}
      <div
        className={`fixed ${
          kitchenOverlay ? "flex" : "hidden"
        } items-center justify-center top-0 left-0 z-50 w-full h-full bg-black/50`}
      >
        <div className="flex flex-col gap-6 w-[30rem] h-auto bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-extrabold">
            {message == "Collect Payment & Send order to Kitchen"
              ? "Collect Payment & Send order to Kitchen"
              : "Send order to Kitchen"}
          </h2>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col pr-10 gap-2 border-r-2">
              <span className="font-semibold">Items Net Total</span>
              {/* <span className="font-bold">US${totalAmount}</span> */}
              <span className="font-bold">
                {user.currency}
                {totalAmount}
              </span>
            </div>
            <div className="flex flex-col pr-10 gap-2 border-r-2">
              <span className="font-semibold">Tax Total</span>
              {/*    <span className="font-bold">+US${totalTax}</span> */}
              <span className="font-bold">
                +{user.currency}
                {totalTax}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold">Payable Total</span>
              <span className="text-xl font-extrabold text-greenBtn">
                {/* US${totalAmount + totalTax} */}
                {user.currency}
                {totalAmount + totalTax}
              </span>
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center justify-end">
            <button
              className="text-gray-500 font-semibold flex items-center gap-1 bg-gray-200 rounded-lg p-2 cursor-pointer transition-all hover:bg-gray-300"
              onClick={() => setKitchenOverlay(false)}
            >
              Close
            </button>
            <button
              onClick={() => {
                {
                  message == "Collect Payment & Send order to Kitchen"
                    ? handlePayAndSendtokitchen()
                    : sendToKitchenHandler();
                  handleTableEdit();
                }
              }}
              className="font-semibold bg-greenBtn text-white rounded-lg p-2 cursor-pointer transition-all  hover:bg-greenBtnHover"
            >
              {message == "Collect Payment & Send order to Kitchen"
                ? "Collect Payment & Send to Kitchen"
                : "Send  to Kitchen"}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-4">
        <h1 className="text-lg font-medium mb-5">POS - Point Of Sale</h1>
        <div className="flex flex-col 2xl:flex-row gap-4">
          <div className="flex flex-col rounded-2xl border-[1px] p-4 gap-2 flex-[1] 2xl:w-2/3 ">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-row items-center gap-2"
            >
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="bg-gray-100 p-3 rounded-full text-gray-500 hover:bg-gray-200">
                    <BiFilterAlt />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute left-0 w-[13rem] origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1  ">
                    {["All", ...new Set(menu.map((item) => item.category))].map(
                      (item, index) => (
                        <MenuItem key={index}>
                          <button
                            onClick={() => setCategoryFilter(item)}
                            className="text-start w-full block px-4 py-2 text-base font-semibold text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                          >
                            {item}
                          </button>
                        </MenuItem>
                      )
                    )}
                  </div>
                </MenuItems>
              </Menu>
              <input
                type="search"
                className="bg-gray-100 px-3 py-2 lg:w-[20rem] rounded-full border-none outline-none"
                placeholder="Search Item"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              ></input>
            </form>
            <div className="grid lg:grid-cols-2 gap-4">
              {!menuSearch
                ? "Please feel free to fill your Menu"
                : menuSearch
                    ?.filter((item) =>
                      categoryFilter == "All"
                        ? item
                        : item.category == categoryFilter
                    )
                    .map((item) => (
                      <div
                        className="flex flex-row gap-2 rounded-2xl border-[1px] p-2 h-[10rem]"
                        key={item.id}
                      >
                        <span className="flex justify-center items-center bg-gray-100 rounded-lg w-2/5 h-auto text-gray-500">
                          <IoRestaurantOutline />
                        </span>
                        <div className="flex flex-col justify-between">
                          <span className="flex flex-col gap-2">
                            <span className="text-sm font-normal">
                              {item.name}
                            </span>
                            <span className="text-sm font-normal">
                              {user.currency}
                              {item.price}
                            </span>
                            <p className="text-xs text-gray-400">
                              {item.category}
                            </p>
                          </span>

                          <button
                            className="cursor-pointer bg-greenBtn rounded-full w-14 px-2 py-1 text-white transition-all  hover:bg-greenBtnHover"
                            onClick={() => addToCartHandler(item)}
                          >
                            {" "}
                            Add{" "}
                          </button>
                        </div>
                      </div>
                    ))}
            </div>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col rounded-2xl border-[1px] 2xl:w-1/3"
          >
            <div className="flex flex-col gap-4 p-4 border-b-[1px] z-88888">
              <div className="relative flex flex-row gap-2">
                <input
                  type="search"
                  className=" bg-[#f9f9fa] border-[1px] rounded-xl p-2 text-black outline-none text-sm font-bold flex-1 hover:cursor-pointer"
                  placeholder="Search Customer"
                  value={selectedCustomer}
                  onChange={(e) => setSelectedCustomer(e.target.value)}
                  onBlur={handleBlur}
                ></input>
                <button className="bg-[#f9f9fa] hover:bg-gray-200 border-[1px] rounded-xl p-2 text-gray-500 outline-none font-bold">
                  <IoSearch size={20} />
                </button>
                {showCustomerMenu && (
                  <ul className="scrollbar1 absolute w-full max-h-56 overflow-y-auto shadow-lg mt-12 left-0 flex flex-col bg-gray-100 rounded-xl p-2">
                    {customerSearch.map((item) => (
                      <li
                        key={item.id}
                        className="hover:cursor-pointer hover:bg-gray-200 p-2 rounded-xl"
                        onClick={() => {
                          setSelectedCustomer(item.name);
                        }}
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <select
                value={diningOption}
                onChange={(e) => setDiningOption(e.target.value)}
                className="bg-[#f9f9fa] border-[1px] rounded-xl p-2 outline-none text-gray-500 text-sm font-semibold cursor-pointer"
              >
                <option value="" className="border-none">
                  Select Dining Option
                </option>
                <option value="Dine in / Delivery" className="border-none">
                  Dine-In
                </option>
                <option value="Take Away" className="border-none">
                  Take Away
                </option>
                <option value="Delivery" className="border-none">
                  Delivery
                </option>
              </select>

              {cartItems.length !== 0 && diningOption.length === 0 ? (
                <span className="text-sm text-[red] -mt-4 ml-3">
                  {" "}
                  This field is required !
                </span>
              ) : null}

              <select
                value={tableOption}
                onChange={(e) => setTableOption(e.target.value)}
                className="bg-[#f9f9fa] border-[1px] rounded-xl p-2 outline-none text-gray-500 text-sm  font-semibold cursor-pointer"
              >
                <option value="" className="border-none">
                  {tables.filter((item) => item.occupied === false).length == 0
                    ? "No Table available"
                    : "Select Table"}
                </option>
                {diningOption === "Dine in"
                  ? tables.map((item) =>
                      item.occupied !== true ? (
                        <option
                          value={item.name}
                          className="border-none"
                          key={item.id}
                        >
                          {item.name}
                        </option>
                      ) : null
                    )
                  : null}
              </select>

              {cartItems.length !== 0 &&
              diningOption === "Dine in" &&
              tableOption.length === 0 ? (
                <span className="text-[red] -mt-4 ml-3">
                  {" "}
                  This field is required !
                </span>
              ) : null}
            </div>

            <div className="flex flex-col gap-4 p-4 border-b-[1px] mt-4">
              {cartItems.length == 0
                ? "Empty Cart"
                : cartItems.map((item) => (
                    <div
                      className="flex flex-col rounded-2xl border-[1px] p-2 gap-1"
                      key={item.id}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-normal">{item.name}</span>
                        <RiDeleteBinLine
                          className="text-[red] cursor-pointer"
                          onClick={() => dispatch(removeFromCart(item))}
                        />
                      </div>

                      <span className="font-normal text-sm">
                        {user.currency}
                        {item.price}{" "}
                        <span className="text-xs text-gray-500">
                          {" "}
                          x {item.qty}
                        </span>
                        <span className="font-bold">
                          {" "}
                          = {user.currency}
                          {item.qty * item.price}
                        </span>
                      </span>
                      <span className="text-xs text-gray-500 mb-2">
                        {item.notes.length !== 0 ? item.notes : null}
                      </span>

                      <div className="flex flex-row justify-between items-center ">
                        <span className="flex gap-2 ">
                          <button
                            type="button"
                            className="flex justify-center items-center text-xl rounded-full transition-all bg-gray-100  hover:bg-gray-200 w-4 h-4 p-4"
                            onClick={() =>
                              dispatch(
                                toggleCartQty({ id: item.id, type: "DEC" })
                              )
                            }
                          >
                            -{" "}
                          </button>
                          <button
                            type="button"
                            className="flex justify-center items-center text-lg rounded-full bg-gray-100 w-4 h-4 p-4 cursor-default"
                          >
                            {item.qty}{" "}
                          </button>
                          <button
                            type="button"
                            className="flex justify-center items-center text-xl rounded-full transition-all bg-gray-100 hover:bg-gray-200 w-4 h-4 p-4"
                            onClick={() =>
                              dispatch(
                                toggleCartQty({ id: item.id, type: "INC" })
                              )
                            }
                          >
                            +{" "}
                          </button>
                        </span>

                        <Link
                          to={`./notes/${item.id}`}
                          className="text-gray-500 flex items-center gap-1 bg-[#f9f9fa] border-[1px] rounded-md p-1 cursor-pointer transition-all hover:bg-gray-200"
                        >
                          {" "}
                          <FaRegNoteSticky />
                          <span className="text-xs font-medium"> Notes</span>
                        </Link>
                      </div>
                    </div>
                  ))}
              <Routes>
                <Route
                  path="/notes/:id"
                  element={
                    <EditNotes setNotes={setNotes} cartItems={cartItems} />
                  }
                />
              </Routes>
            </div>
            {cartItems.length == 0 ? null : (
              <div className="flex flex-col gap-2 p-4">
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="text-sm font-semibold text-gray-500 flex items-center justify-center gap-2 bg-[#f9f9fa] cursor-pointer transition-all hover:bg-gray-200 border-[1px] rounded-xl p-2"
                  >
                    <FaRegSave size={18} /> Draft
                  </button>
                  <button
                    type="submit"
                    disabled={
                      !diningOption ||
                      (diningOption === "Dine in" && !tableOption)
                        ? true
                        : false
                    }
                    onClick={() => {
                      handleKitchenOverlay(true, "Send order to Kitchen");
                      /* setKitchenOverlay(true); */
                      dispatch(getCartTotal());
                      dispatch(getTotalTax());
                    }}
                    className="text-sm font-semibold flex-[1] text-gray-500 flex items-center justify-center gap-2 bg-[#f9f9fa] cursor-pointer transition-all hover:bg-gray-200 border-[1px] rounded-xl p-2"
                  >
                    {" "}
                    <LuChefHat size={18} /> Send to kitchen
                  </button>
                </div>
                <button
                  disabled={
                    !diningOption ||
                    (diningOption === "Dine in" && !tableOption)
                      ? true
                      : false
                  }
                  type="button"
                  className="text-sm font-semibold text-white flex items-center justify-center gap-2 bg-greenBtn transition-all  hover:bg-greenBtnHover rounded-xl p-2 "
                  onClick={() => {
                    handleKitchenOverlay(
                      "Collect Payment & Send order to Kitchen"
                    );
                    /* handleCreateReceiptPay(); */
                    /*  handleReceiptAndPay(); */
                    /* setReceiptOverlay(true); */
                    dispatch(getCartTotal());
                    dispatch(getTotalTax());
                  }}
                >
                  <MdOutlinePayments size={18} /> Create Receipt & Pay
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default POS;
