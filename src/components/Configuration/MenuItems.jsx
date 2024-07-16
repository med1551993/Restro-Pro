import React from "react";
import { Menu } from "../../DummyDate";
import { TbArmchair2 } from "react-icons/tb";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import deleteFromMenu from "../../store/userSlice";

const MenuItems = ({ data }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col p-4 flex-[1]">
      <span className="flex flex-row items-center gap-5 mb-5">
        <h1 className="text-xl font-semibold">Menu</h1>
        <button className="font-bold text-gray-500 flex items-center justify-center gap-2 bg-[#f9f9fa] cursor-pointer transition-all hover:bg-gray-200 border-2 rounded-xl px-2 py-1">
          + New
        </button>
        <button className="font-bold text-gray-500 flex items-center justify-center gap-2 bg-[#f9f9fa] cursor-pointer transition-all hover:bg-gray-200 border-2 rounded-xl px-2 py-1">
          Categories
        </button>
      </span>

      <div className="grid grid-cols-3 gap-4">
        {data.menu.map((item) => (
          <div
            className="flex flex-row items-center gap-2 rounded-2xl border-2 p-2"
            key={item.id}
          >
            <span className="flex justify-center items-center bg-gray-100 rounded-full h-auto text-gray-500 p-5">
              <TbArmchair2 />{" "}
            </span>
            <div className="flex flex-row items-center justify-between flex-[1]">
              <span className="flex flex-col">
                <span className="font-medium">
                  {item.name} - {item.price}
                </span>
                {/*  <span className="font-medium text-gray-500 text-sm">
                  Setting Capacity: {item.capacity}
                </span> */}
              </span>
              <span className="flex felx-row items-center gap-2">
                <span className="font-medium text-gray-500 cursor-pointer">
                  <MdOutlineModeEdit size={20} />
                </span>
                <span
                  className="font-medium"
                  onClick={() => dispatch(deleteFromMenu(item))}
                >
                  <RiDeleteBinLine className="text-[red] cursor-pointer" />
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuItems;
