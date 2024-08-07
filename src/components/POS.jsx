import React, { useEffect, useState, useRef } from "react";
/* import { Menu } from "../DummyDate"; */
import { Recceipt } from "../DummyDate";
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
  getCartTotal,
  clearCart,
} from "../store/cartSlice";
import axios from "axios";
import { Link, Route, Routes } from "react-router-dom";
import EditNotes from "./EditNotes";
import { format } from "date-fns";
import ReactPrint from "react-to-print";

const POS = () => {
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

  const dispatch = useDispatch();

  const {
    data: cartItems,
    Dining_Option,
    table_option,
    totalItems,
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
    };
    dispatch(addToCart(tempItem));
  };

  const addInvoiceshandles = async (OrderId) => {
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

    const order = {
      data: cartItems,
      table: tableOption,
      diningOption: diningOption,
      time: time,
      date: date,
      customer: selectedCustomer,
      ready: false,
    };

    try {
      const response = await axios.post("http://localhost:3600/orders", order);

      addInvoiceshandles(response.data.id);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleReceiptAndPay = () => {
    dispatch(clearCart());
    setDiningOption("");
    setTableOption("");
    setSelectedCustomer("");
    setReceiptOverlay(false);
  };

  const sendToKitchenHandler = () => {
    handleKitchenSubmit();
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
        setMenu(responseMenu.data);
        setTables(responseTable.data);
        setCustomer(responseCustomer.data);
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

  return (
    <>
      {/* Receipt overlay */}
      <div
        className={`absolute ${
          receiptOverlay ? "flex" : "hidden"
        } flex-col items-center justify-center gap-2 top-0 left-0 z-50 w-full h-full bg-black/50`}
      >
        <div className="w-96 rounded bg-gray-50 px-6 pt-8 shadow-lg" ref={ref}>
          {/*  <img
            src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg"
            alt="chippz"
            className="mx-auto w-16 py-4"
          /> */}
          <div className="flex flex-col justify-center items-center gap-2">
            <h4 className="font-semibold uppercase">Business Name</h4>
            <p className="text-xs uppercase">welcome to your restaurant</p>
          </div>
          <div className="flex flex-col gap-3 border-b py-6 text-xs">
            <p className="flex justify-between">
              <span className="text-gray-400">Receipt No.:</span>
              <span>#5033</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-400">Order Type:</span>
              <span>{diningOption}</span>
            </p>
            {/*  <p className="flex justify-between">
              <span className="text-gray-400">Host:</span>
              <span>Jane Doe</span>
            </p> */}
            <p className="flex justify-between">
              <span className="text-gray-400">Customer:</span>
              <span>{selectedCustomer}</span>
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
                {cartItems.map((item) => (
                  <tr key={item.id} className="flex">
                    <td className="flex-1 py-1">{item.name}</td>
                    <td className="min-w-[44px]">{item.qty}</td>
                    <td className="min-w-[44px]">${item.price * item.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className=" border-b border border-dashed"></div>
            <div className="flex flex-row items-center justify-end p-2 font-bold text-lg">
              <span className="min-w-[44px] ">Total</span>
              <span> ${totalAmount}</span>
            </div>

            {/* <div className="py-4 justify-center items-center flex flex-col gap-2">
              <p className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21.3 12.23h-3.48c-.98 0-1.85.54-2.29 1.42l-.84 1.66c-.2.4-.6.65-1.04.65h-3.28c-.31 0-.75-.07-1.04-.65l-.84-1.65a2.567 2.567 0 0 0-2.29-1.42H2.7c-.39 0-.7.31-.7.7v3.26C2 19.83 4.18 22 7.82 22h8.38c3.43 0 5.54-1.88 5.8-5.22v-3.85c0-.38-.31-.7-.7-.7ZM12.75 2c0-.41-.34-.75-.75-.75s-.75.34-.75.75v2h1.5V2Z"
                    fill="#000"
                  ></path>
                  <path
                    d="M22 9.81v1.04a2.06 2.06 0 0 0-.7-.12h-3.48c-1.55 0-2.94.86-3.63 2.24l-.75 1.48h-2.86l-.75-1.47a4.026 4.026 0 0 0-3.63-2.25H2.7c-.24 0-.48.04-.7.12V9.81C2 6.17 4.17 4 7.81 4h3.44v3.19l-.72-.72a.754.754 0 0 0-1.06 0c-.29.29-.29.77 0 1.06l2 2c.01.01.02.01.02.02a.753.753 0 0 0 .51.2c.1 0 .19-.02.28-.06.09-.03.18-.09.25-.16l2-2c.29-.29.29-.77 0-1.06a.754.754 0 0 0-1.06 0l-.72.72V4h3.44C19.83 4 22 6.17 22 9.81Z"
                    fill="#000"
                  ></path>
                </svg>{" "}
                info@example.com
              </p>
              <p className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fill="#000"
                    d="M11.05 14.95L9.2 16.8c-.39.39-1.01.39-1.41.01-.11-.11-.22-.21-.33-.32a28.414 28.414 0 01-2.79-3.27c-.82-1.14-1.48-2.28-1.96-3.41C2.24 8.67 2 7.58 2 6.54c0-.68.12-1.33.36-1.93.24-.61.62-1.17 1.15-1.67C4.15 2.31 4.85 2 5.59 2c.28 0 .56.06.81.18.26.12.49.3.67.56l2.32 3.27c.18.25.31.48.4.7.09.21.14.42.14.61 0 .24-.07.48-.21.71-.13.23-.32.47-.56.71l-.76.79c-.11.11-.16.24-.16.4 0 .08.01.15.03.23.03.08.06.14.08.2.18.33.49.76.93 1.28.45.52.93 1.05 1.45 1.58.1.1.21.2.31.3.4.39.41 1.03.01 1.43zM21.97 18.33a2.54 2.54 0 01-.25 1.09c-.17.36-.39.7-.68 1.02-.49.54-1.03.93-1.64 1.18-.01 0-.02.01-.03.01-.59.24-1.23.37-1.92.37-1.02 0-2.11-.24-3.26-.73s-2.3-1.15-3.44-1.98c-.39-.29-.78-.58-1.15-.89l3.27-3.27c.28.21.53.37.74.48.05.02.11.05.18.08.08.03.16.04.25.04.17 0 .3-.06.41-.17l.76-.75c.25-.25.49-.44.72-.56.23-.14.46-.21.71-.21.19 0 .39.04.61.13.22.09.45.22.7.39l3.31 2.35c.26.18.44.39.55.64.1.25.16.5.16.78z"
                  ></path>
                </svg>{" "}
                +234XXXXXXXX
              </p>
            </div> */}

            <div className="py-4 flex flex-col justify-center items-center gap-2  ">
              <p className=" border-b border-dashed w-full text-center uppercase">
                We thank you for your visit
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
              <button
                onClick={() => {
                  handleReceiptAndPay();
                }}
                className="font-semibold bg-greenBtn text-white rounded-lg p-2 cursor-pointer transition-all  hover:bg-greenBtnHover"
              >
                Print
              </button>
            )}
            content={() => ref.current}
            documentTitle={"receipt"}
          />
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`fixed ${
          kitchenOverlay ? "flex" : "hidden"
        } items-center justify-center top-0 left-0 z-50 w-full h-full bg-black/50`}
      >
        <div className="flex flex-col gap-6 w-[30rem] h-auto bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-extrabold">Send order to Kitchen</h2>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col pr-10 gap-2 border-r-2">
              <span className="font-semibold">Items Net Total</span>
              <span className="font-bold">US${totalAmount}</span>
            </div>
            <div className="flex flex-col pr-10 gap-2 border-r-2">
              <span className="font-semibold">Tax Total</span>
              <span className="font-bold">+US$4.12</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold">Payable Total</span>
              <span className="text-xl font-extrabold text-greenBtn">
                US${totalAmount + 4.12}
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
                sendToKitchenHandler();
                handleTableEdit();
              }}
              className="font-semibold bg-greenBtn text-white rounded-lg p-2 cursor-pointer transition-all  hover:bg-greenBtnHover"
            >
              Send to kitchen
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-4">
        <h1 className="text-xl font-semibold mb-5">POS - Point Of Sale</h1>
        <div className="flex flex-col 2xl:flex-row gap-4">
          <div className="flex flex-col rounded-2xl border-2 p-4 gap-2 flex-[1] 2xl:w-2/3">
            <form onSubmit={(e) => e.preventDefault()}>
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
                : menuSearch.map((item) => (
                    <div
                      className="flex flex-row gap-2 rounded-2xl border-2 p-2 h-[10rem]"
                      key={item.id}
                    >
                      <span className="flex justify-center items-center bg-gray-100 rounded-lg w-1/5 h-auto text-gray-500">
                        <IoRestaurantOutline />
                      </span>
                      <div className="flex flex-col justify-between">
                        <span className="flex flex-col gap-2">
                          <span className="font-medium">{item.name}</span>
                          <span className="font-medium">US${item.price}</span>
                          <p className="text-sm text-gray-400">
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
            className="flex flex-col rounded-2xl border-2 2xl:w-1/3"
          >
            <div className="flex flex-col gap-4 p-4 border-b-2 z-88888">
              <div className="relative flex flex-row gap-2">
                <input
                  type="search"
                  className=" bg-[#f9f9fa] border-2 rounded-xl p-2 text-black outline-none font-bold flex-1 hover:cursor-pointer"
                  placeholder="Search Customer"
                  value={selectedCustomer}
                  onChange={(e) => setSelectedCustomer(e.target.value)}
                  onBlur={handleBlur}
                ></input>
                <button className="bg-[#f9f9fa] hover:bg-gray-200 border-2 rounded-xl p-2 text-gray-500 outline-none font-bold">
                  <IoSearch size={25} />
                </button>
                {showCustomerMenu && (
                  <ul className="absolute w-full max-h-56 overflow-y-auto shadow-lg mt-12 left-0 flex flex-col bg-gray-100 rounded-xl p-2">
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
                className="bg-[#f9f9fa] border-2 rounded-xl p-2 outline-none text-gray-500 font-semibold cursor-pointer"
              >
                <option value="" className="border-none">
                  Select Dining Option
                </option>
                <option value="Dine Out- Delivery" className="border-none">
                  Dine Out / Delivery
                </option>
                <option value="Dine in" className="border-none">
                  Dine in
                </option>
              </select>

              {cartItems.length !== 0 && diningOption.length === 0 ? (
                <span className="text-[red] -mt-4 ml-3">
                  {" "}
                  This field is required !
                </span>
              ) : null}

              <select
                value={tableOption}
                onChange={(e) => setTableOption(e.target.value)}
                className="bg-[#f9f9fa] border-2 rounded-xl p-2 outline-none text-gray-500 font-semibold cursor-pointer"
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

            <div className="flex flex-col gap-4 p-4 border-b-2 mt-4">
              {cartItems.length == 0
                ? "Empty Cart"
                : cartItems.map((item) => (
                    <div
                      className="flex flex-col rounded-2xl border-2 p-2 gap-1"
                      key={item.id}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{item.name}</span>
                        <RiDeleteBinLine
                          className="text-[red] cursor-pointer"
                          onClick={() => dispatch(removeFromCart(item))}
                        />
                      </div>

                      <span className="font-medium">
                        US${item.price}{" "}
                        <span className="text-sm text-gray-500">
                          {" "}
                          x {item.qty}
                        </span>
                        <span className="font-bold">
                          {" "}
                          = US${item.qty * item.price}
                        </span>
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
                            className="flex justify-center items-center text-xl rounded-full bg-gray-100 w-4 h-4 p-4 cursor-default"
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
                          className="text-gray-500 flex items-center gap-1 bg-[#f9f9fa] border-2 rounded-xl p-1 cursor-pointer transition-all hover:bg-gray-200"
                        >
                          {" "}
                          <FaRegNoteSticky />
                          <span className="font-semibold"> Notes</span>
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
            {cartItems.length == 0 ? (
              ""
            ) : (
              <div className="flex flex-col gap-2 p-4">
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="font-bold text-gray-500 flex items-center justify-center gap-2 bg-[#f9f9fa] cursor-pointer transition-all hover:bg-gray-200 border-2 rounded-xl p-2"
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
                      setKitchenOverlay(true);
                      dispatch(getCartTotal());
                    }}
                    className="font-bold flex-[1] text-gray-500 flex items-center justify-center gap-2 bg-[#f9f9fa] cursor-pointer transition-all hover:bg-gray-200 border-2 rounded-xl p-2"
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
                  className="font-bold text-white flex items-center justify-center gap-2 bg-greenBtn transition-all  hover:bg-greenBtnHover rounded-xl p-2 "
                  onClick={() => {
                    setReceiptOverlay(true);
                    dispatch(getCartTotal());
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
