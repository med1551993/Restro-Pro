import React, { useState, useEffect } from "react";

import { IoRestaurantOutline } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import EditMenu from "./EditMenu";
import { Link, Route, Routes } from "react-router-dom";

const MenuList = ({
  menu,
  menuName,
  setMenuName,
  menuCategory,
  setMenuCategory,
  menuPrice,
  setMenuPrice,
  category,
  setCategory,
  menuOverlay,
  setMenuOverlay,
  handleSubmit,
  handleDelete,
  handleEditMenu,
}) => {
  const [categoryFilter, setCategoryFilter] = useState("All");
  return (
    <>
      {/* Overlay Add*/}
      <div
        className={`absolute ${
          menuOverlay ? "flex" : "hidden"
        } items-center justify-center top-0 left-0 z-99999999 w-full h-full bg-black/50 z-50`}
      >
        <div className="flex flex-col gap-6 w-[30rem] h-auto bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-extrabold">Adding new Menu</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label htmlFor="username" className="text-[1.1rem] font-medium">
              Name
            </label>
            <input
              autoComplete="off"
              id="username"
              className=" text-sm w-full px-3 py-2 rounded-[5px] border-[1px] border-gray-300 outline-blue-400 mb-4 required"
              type="text"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
            ></input>

            <label htmlFor="category" className="text-[1.1rem] font-medium">
              Category
            </label>
            <input
              autoComplete="off"
              id="category"
              className=" text-sm w-full px-3 py-2 rounded-[5px] border-[1px] border-gray-300 outline-blue-400 mb-4 required"
              type="text"
              value={menuCategory}
              onChange={(e) => setMenuCategory(e.target.value)}
            ></input>

            <label htmlFor="price" className="text-[1.1rem] font-medium">
              Price
            </label>
            <input
              autoComplete="off"
              id="price"
              type="text"
              className=" text-sm w-full px-3 py-2 rounded-[5px] border-[1px] border-gray-300 outline-blue-400 mb-4 required"
              value={menuPrice}
              onChange={(e) => setMenuPrice(e.target.value)}
            ></input>
            <div className="flex flex-row gap-2 items-center justify-end">
              <span
                className="text-gray-500 font-semibold flex items-center gap-1 bg-gray-200 rounded-lg p-2 cursor-pointer transition-all hover:bg-gray-300"
                onClick={() => {
                  setMenuOverlay(false);
                  setMenuName("");
                  setMenuCategory("");
                  setMenuPrice("");
                }}
              >
                Close
              </span>
              <button
                disabled={
                  !menuName || !menuCategory || !menuPrice ? true : false
                }
                onClick={() => handleSubmit}
                type="submit"
                className={`font-semibold bg-greenBtn text-white rounded-lg p-2 transition-all 
                           ${
                             !menuName || !menuCategory || !menuPrice
                               ? "opacity-35"
                               : "hover:bg-greenBtnHover cursor-pointer"
                           }  `}
              >
                Add Menu
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex flex-col p-4 flex-[1]">
        <span className="flex flex-row items-center gap-5 mb-5">
          <h1 className="text-xl font-semibold">Menu</h1>
          <button
            onClick={() => setMenuOverlay(true)}
            className="font-bold text-gray-500 flex items-center justify-center gap-2 bg-[#f9f9fa] cursor-pointer transition-all hover:bg-gray-200 border-2 rounded-xl px-2 py-1"
          >
            + New
          </button>

          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="">
                <button className="font-bold text-gray-500 flex items-center justify-center gap-2 bg-[#f9f9fa] cursor-pointer transition-all hover:bg-gray-200 border-2 rounded-xl px-2 py-1">
                  Categories
                </button>{" "}
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute left-0  origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <button
                    onClick={() => setCategoryFilter("All")}
                    className="text-start w-full block px-4 py-2 text-base font-semibold text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    All
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={() => setCategoryFilter("Appetizers")}
                    className="text-start w-full block px-4 py-2 text-base font-semibold text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    Appetizers
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={() => setCategoryFilter("Entrees")}
                    className="text-start w-full block px-4 py-2 text-base font-semibold text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    Entrees
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={() => setCategoryFilter("Sides")}
                    className="text-start w-full block px-4 py-2 text-base font-semibold text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    Sides
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={() => setCategoryFilter("Desserts")}
                    className="text-start w-full block px-4 py-2 text-base font-semibold text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    Desserts
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </span>

        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
          {menu.length === 0
            ? "Add your Menu here."
            : menu
                ?.filter((item) =>
                  categoryFilter == "All"
                    ? item
                    : item.category == categoryFilter
                )
                ?.map((item) => (
                  <div
                    className="flex flex-row items-center gap-2 rounded-2xl border-2 p-2"
                    key={item.id}
                  >
                    <span className="flex justify-center items-center bg-gray-100 rounded-full h-auto text-gray-500 p-5">
                      <IoRestaurantOutline />
                    </span>
                    <div className="flex flex-row items-center justify-between flex-[1]">
                      <span className="flex flex-col">
                        <span className="font-medium">
                          {item.name} - {item.price}
                        </span>

                        <p className="text-gray-400 text-sm">{item.category}</p>
                      </span>
                      <span className="flex felx-row items-center gap-2">
                        <Link
                          to={`./edit/${item.id}`}
                          className="font-medium text-gray-500 cursor-pointer"
                        >
                          <MdOutlineModeEdit size={20} />
                        </Link>
                        <span
                          className="font-medium"
                          onClick={() => handleDelete(item.id)}
                        >
                          <RiDeleteBinLine className="text-[red] cursor-pointer" />
                        </span>
                      </span>
                    </div>
                  </div>
                ))}
          <Routes>
            <Route
              path="/edit/:id"
              element={
                <EditMenu
                  menu={menu}
                  menuName={menuName}
                  setMenuName={setMenuName}
                  menuCategory={menuCategory}
                  setMenuCategory={setMenuCategory}
                  menuPrice={menuPrice}
                  setMenuPrice={setMenuPrice}
                  handleEditMenu={handleEditMenu}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default MenuList;