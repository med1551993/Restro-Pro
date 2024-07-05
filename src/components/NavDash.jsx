import React from "react";
import { FiAlignJustify } from "react-icons/fi";
import photo_profile from "../images/photo_profile.png";
import { IoIosArrowDown } from "react-icons/io";

const NavDash = () => {
  return (
    <>
      <nav className="max-w-full mx-auto py-[1rem] px-[0.7rem] flex items-center justify-between">
        <button className="sm:hidden hover:cursor-pointer">
          <FiAlignJustify size={30} />
        </button>
        <input
          type="text"
          className="bg-dashBg px-3 py-2 rounded-full border-none outline-none"
          placeholder="&#128269; Search"
        ></input>

        <div className="flex items-center bg-dashBg rounded-full p-1 cursor-pointer">
          <img
            src={photo_profile}
            alt="admin"
            className="w-[2rem] rounded-full sm:mr-2"
          />
          <span className="hidden sm:block mr-2">Nancy Patel</span>
          <span className="hidden sm:block">
            <IoIosArrowDown />
          </span>
        </div>
      </nav>
    </>
  );
};

export default NavDash;
