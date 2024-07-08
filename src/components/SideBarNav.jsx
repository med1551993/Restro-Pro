import React from "react";
import photo_profile from "../images/photo_profile.png";
import { RiDashboardLine } from "react-icons/ri";
import { MdOutlineRestaurant } from "react-icons/md";
import { TbChefHat } from "react-icons/tb";
import { GoPeople } from "react-icons/go";
import { TbFileInvoice } from "react-icons/tb";
import { TbUsersGroup } from "react-icons/tb";
import { TbPresentationAnalytics } from "react-icons/tb";
import { TbArmchair2 } from "react-icons/tb";
import { Link } from "react-router-dom";

const SideBarNav = () => {
  return (
    <>
      <div className="hidden sm:flex flex-col items-center lg:items-start p-6 bg-dashBg w-[6rem] lg:w-[17rem] text-darkGreen">
        {/* Logo */}
        <Link
          to="/"
          className="flex flex-col justify-center items-start font-black text-darkGreen mb-8 cursor-pointer"
        >
          <h4 className="text-xs lg:text-base text-greenBtn mb-[-0.8rem] ml-[2.3rem] lg:ml-[5rem]">
            PRO
          </h4>
          <h3 className="text-xl lg:text-4xl">Restro</h3>
        </Link>
        {/* Admin Photo */}
        <div className="hidden lg:flex items-center bg-dashBg rounded-full p-1 cursor-pointer md:mb-8">
          <img
            src={photo_profile}
            alt="admin"
            className="w-[3rem] rounded-full sm:mr-2"
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold">Nancy Patel</span>
            <span className="text-sm font-medium text-gray-500">Admin</span>
          </div>
        </div>
        {/* Dashboard Nav */}
        <div className="w-full *:rounded-full *:p-2 *:cursor-pointer *:transition-all">
          <Link
            to=""
            className="hidden lg:block hover:bg-dashBgHover mb-4 lg:mb-8"
          >
            <div className="flex flex-row items-center gap-2 font-bold  ">
              <RiDashboardLine size={20} /> Dashboard
            </div>
          </Link>
          <Link to="POS" className="hidden lg:block hover:bg-dashBgHover mb-4">
            <div className="flex flex-row items-center gap-2 font-medium ">
              <MdOutlineRestaurant size={20} /> POS
            </div>
          </Link>
          <div className="flex flex-row items-center gap-2 font-medium hover:bg-dashBgHover mb-4">
            <MdOutlineRestaurant size={20} />{" "}
            <span className="hidden lg:block">Orders</span>
          </div>
          <div className="flex flex-row items-center gap-2 font-medium hover:bg-dashBgHover mb-4">
            <TbChefHat size={20} />{" "}
            <span className="hidden lg:block">Kitchen</span>
          </div>

          <div className="hidden lg:flex flex-row items-center font-bold my-4 -translate-x-2">
            <span>Offerings</span>
          </div>
          <div className="flex flex-row items-center gap-2 font-medium hover:bg-dashBgHover mb-4">
            <TbArmchair2 size={20} />{" "}
            <span className="hidden lg:block">Reservation</span>
          </div>
          <div className="flex flex-row items-center gap-2 font-medium hover:bg-dashBgHover mb-4">
            <GoPeople size={20} />{" "}
            <span className="hidden lg:block">Customers</span>
          </div>
          <div className="flex flex-row items-center gap-2 font-medium hover:bg-dashBgHover mb-4">
            <TbFileInvoice size={20} />{" "}
            <span className="hidden lg:block">Invoices</span>
          </div>

          <div className="hidden lg:flex flex-row items-center font-bold my-4 -translate-x-2">
            <span>Back Office</span>
          </div>
          <div className="flex flex-row items-center gap-2 font-medium hover:bg-dashBgHover mb-4">
            <TbUsersGroup size={20} />{" "}
            <span className="hidden lg:block">Users</span>
          </div>
          <div className="flex flex-row items-center gap-2 font-medium hover:bg-dashBgHover mb-4">
            <TbPresentationAnalytics size={20} />{" "}
            <span className="hidden lg:block">Reports</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBarNav;
