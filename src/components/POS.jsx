import React, { useEffect, useState } from "react";
/* import { Menu } from "../DummyDate"; */
import { Recceipt } from "../DummyDate";
import { IoRestaurantOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegNoteSticky } from "react-icons/fa6";
import { FaRegSave } from "react-icons/fa";
import { LuChefHat } from "react-icons/lu";
import { MdOutlinePayments } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, toggleCartQty } from "../store/cartSlice";

const POS = ({ menu }) => {
  const [menuSearch, setMenuSearch] = useState([]);
  const [search, setSearch] = useState("");
  const [kitchenOverlay, setKitchenOverlay] = useState(false);
  const dispatch = useDispatch();
  const {
    data: cartItems,
    totalItems,
    totalAmount,
  } = useSelector((store) => store.cart);

  const addToCartHandler = (item) => {
    const tempItem = {
      ...item,
      qty: 1,
      notes: "",
    };
    dispatch(addToCart(tempItem));
  };

  useEffect(() => {
    const filteredMenu = menu.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setMenuSearch(filteredMenu);
  }, [menu, search]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`absolute ${
          kitchenOverlay ? "flex" : "hidden"
        } items-center justify-center top-0 left-0 z-99999999 w-full h-full bg-black/50`}
      >
        <div className="flex flex-col gap-6 w-[30rem] h-auto bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-extrabold">Send order to Kitchen</h2>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col pr-10 gap-2 border-r-2">
              <span className="font-semibold">Items Net Total</span>
              <span className="font-bold">US$64.28</span>
            </div>
            <div className="flex flex-col pr-10 gap-2 border-r-2">
              <span className="font-semibold">Tax Total</span>
              <span className="font-bold">+US$4.12</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold">Payable Total</span>
              <span className="text-xl font-extrabold text-greenBtn">
                US$68.50
              </span>
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center justify-end">
            <button className="text-gray-500 font-semibold flex items-center gap-1 bg-gray-200 rounded-lg p-2 cursor-pointer transition-all hover:bg-gray-300"
            onClick={() => setKitchenOverlay(false)}>
              Close
            </button>
            <button className="font-semibold bg-greenBtn text-white rounded-lg p-2 cursor-pointer transition-all  hover:bg-greenBtnHover">
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
                type="text"
                className="bg-gray-100 px-3 py-2 lg:w-[20rem] rounded-full border-none outline-none"
                placeholder="Search Item"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              ></input>
            </form>
            <div className="grid lg:grid-cols-2 gap-4">
              {menuSearch.length == 0
                ? "Please feel free to fill your Menu"
                : menuSearch.map((item) => (
                    <div
                      className="flex flex-row gap-2 rounded-2xl border-2 p-2 h-[8rem]"
                      key={item.id}
                    >
                      <span className="flex justify-center items-center bg-gray-100 rounded-lg w-1/5 h-auto text-gray-500">
                        <IoRestaurantOutline />
                      </span>
                      <div className="flex flex-col justify-between">
                        <span className="flex flex-col gap-2">
                          <span className="font-medium">{item.name}</span>
                          <span className="font-medium">US${item.price}</span>
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

          <div className="flex flex-col rounded-2xl border-2 2xl:w-1/3">
            {/* Notes */}
            {/*  <div className="absolute top-0 left-0 w-full h-full bg-white z-99999 rounded-2xl border-2">
              <span className="absolute top-5 right-5 text-black font-bold text-2xl cursor-pointer hover:scale-110 transition-all">
                X
              </span>
              <span>
                {" "}
                <textarea
                  name="notes"
                  id=""
                  className="h-full w-full bg-gray-100"
                ></textarea>
              </span>
            </div> */}

            <div className="flex flex-col gap-4 p-4 border-b-2">
              <input
                type="text"
                className="bg-[#f9f9fa] border-2 rounded-xl p-2 text-black outline-none font-bold"
                placeholder="Search Item"
              ></input>
              <select className="bg-[#f9f9fa] border-2 rounded-xl p-2 outline-none text-gray-500 font-semibold cursor-pointer">
                <option className="border-none">Select Dining Option</option>
              </select>
              <select className="bg-[#f9f9fa] border-2 rounded-xl p-2 outline-none text-gray-500 font-semibold cursor-pointer">
                <option className="border-none">Select Table</option>
              </select>
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
                            className="flex justify-center items-center text-xl rounded-full transition-all bg-gray-100  hover:bg-gray-200 w-4 h-4 p-4"
                            onClick={() =>
                              dispatch(
                                toggleCartQty({ id: item.id, type: "DEC" })
                              )
                            }
                          >
                            -{" "}
                          </button>
                          <button className="flex justify-center items-center text-xl rounded-full bg-gray-100 w-4 h-4 p-4 cursor-default">
                            {item.qty}{" "}
                          </button>
                          <button
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

                        <span className="text-gray-500 flex items-center gap-1 bg-[#f9f9fa] border-2 rounded-xl p-1 cursor-pointer transition-all hover:bg-gray-200">
                          {" "}
                          <FaRegNoteSticky />
                          <span className="font-semibold"> Notes</span>
                        </span>
                      </div>
                    </div>
                  ))}
            </div>
            {cartItems.length == 0 ? (
              ""
            ) : (
              <div className="flex flex-col gap-2 p-4">
                <div className="flex gap-2">
                  <button className="font-bold text-gray-500 flex items-center justify-center gap-2 bg-[#f9f9fa] cursor-pointer transition-all hover:bg-gray-200 border-2 rounded-xl p-2">
                    <FaRegSave size={18} /> Draft
                  </button>
                  <button className="font-bold flex-[1] text-gray-500 flex items-center justify-center gap-2 bg-[#f9f9fa] cursor-pointer transition-all hover:bg-gray-200 border-2 rounded-xl p-2">
                    {" "}
                    <LuChefHat size={18} /> Send to kitchen
                  </button>
                </div>
                <button
                  className="font-bold text-white flex items-center justify-center gap-2 bg-greenBtn transition-all  hover:bg-greenBtnHover rounded-xl p-2 "
                  onClick={() => setKitchenOverlay(true)}
                >
                  <MdOutlinePayments size={18} /> Create Receipt & Pay
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default POS;
