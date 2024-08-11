import React, { useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import photo_profile from "../images/photo_profile.png";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const NavDash = () => {
  const [dropMenu, setDropMenu] = useState(false);

  const handleBlur = () => {
    setTimeout(() => {
      setDropMenu(false);
    }, 100);
  };

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
        {/*  <div
          className={`flex items-center bg-dashBg p-1 cursor-pointer relative ${
            dropMenu ? "rounded-t-md" : "rounded-full"
          }`}
          tabIndex="1"
          onClick={() => setDropMenu(!dropMenu)}
          onBlur={() => handleBlur()}
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
        </div> */}

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="flex items-center bg-dashBg p-1 cursor-pointer rounded-full">
              <img
                src={photo_profile}
                alt="admin"
                className="w-[2rem] rounded-full sm:mr-2"
              />
              <span className="hidden sm:block mr-2">Nancy Patel</span>
              <span className="hidden sm:block">
                <IoIosArrowDown />
              </span>
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute z-50 w-[13rem] right-0 top-[120%] origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="p-2 rouded-full">
              <MenuItem>
                <Link
                  to="settings"
                  className="flex flex-row items-center gap-2 hover:bg-dashBg  p-2 rounded-xl transition-all"
                >
                  <CgProfile size={20} />{" "}
                  <span className="font-light">Profile</span>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to=""
                  className="flex flex-row items-center gap-2 hover:bg-[#f8d7da]  p-2 rounded-xl transition-all text-[red]"
                >
                  <TbLogout size={20} />{" "}
                  <span className="font-light"> Log out</span>
                </Link>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>

        {/*   <div
            className={`absolute top-full left-0 flex flex-col bg-dashBg z-50 w-full h-0 *:cursor-pointer *:p-2 *:font-normal transition-all duration-200
              ${
                dropMenu ? "scale-y-100 rounded-b-md bg-dashBg" : " scale-y-0"
              } `}
          >
            <Link
              to="settings"
              className="flex flex-row items-center gap-2 hover:bg-[#ccd7c8] bg-dashBg"
            >
              <CgProfile size={20} /> Profile
            </Link>
            <span className="flex flex-row items-center gap-2 hover:bg-[#ccd7c8] bg-dashBg">
              {" "}
              <TbLogout size={20} /> Log out
            </span>
          </div> */}
      </nav>
    </>
  );
};

export default NavDash;
