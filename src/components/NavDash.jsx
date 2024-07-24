import React, { useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import photo_profile from "../images/photo_profile.png";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

const NavDash = () => {
  const [dropMenu, setDropMenu] = useState(false);

  return (
    <>
      <nav className="max-w-full mx-auto py-[1rem] px-[0.7rem] flex items-center justify-between">
        <button className="sm:hidden hover:cursor-pointer">
          <FiAlignJustify size={30} />
        </button>
        <input
          type="text"
          className="bg-dashBg px-3 py-2 lg:w-[20rem] rounded-full border-none outline-none"
          placeholder="Search"
        ></input>
        <div
          className={`flex items-center bg-dashBg p-1 cursor-pointer relative ${dropMenu ? "rounded-t-md" : "rounded-full"}`}
          onClick={() => setDropMenu(!dropMenu)}
        >
          <img
            src={photo_profile}
            alt="admin"
            className="w-[2rem] rounded-full sm:mr-2"
          />
          <span className="hidden sm:block mr-2">Nancy Patel</span>
          <span className="hidden sm:block">
            <IoIosArrowDown />
          </span>
         
            <div
              className={`absolute top-full left-0 flex flex-col bg-dashBg w-full *:cursor-pointer *:p-2 *:font-semibold transition-all duration-200
              ${dropMenu ? "rounded-b-md" : "hidden"} `}
            
            >
              <Link to="settings" className="hover:bg-[#ccd7c8]">Profile</Link>
              <span className="hover:bg-[#ccd7c8]">Log out</span>
            </div>
        
        </div>
      </nav>
    </>
  );
};

export default NavDash;
