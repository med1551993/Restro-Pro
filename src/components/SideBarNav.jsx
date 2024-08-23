import React, { useState } from "react";
import photo_profile from "../images/photo_profile.png";
import { RiDashboardLine } from "react-icons/ri";
import { MdOutlineRestaurant } from "react-icons/md";
import { TbChefHat } from "react-icons/tb";
import { GoPeople } from "react-icons/go";
import { TbFileInvoice } from "react-icons/tb";
import { TbUsersGroup } from "react-icons/tb";
import { TbPresentationAnalytics } from "react-icons/tb";
import { TbArmchair2 } from "react-icons/tb";
import { RiSettingsLine } from "react-icons/ri";
import { MdSystemUpdateAlt } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const SideBarNav = ({ update, setUpdate, open, setOpen }) => {
  const [reduce, setReduce] = useState(false);

  return (
    <>
      <div
        className={`${
          reduce ? "w-[7rem]" : "lg:w-[15rem] "
        }  hidden sm:flex flex-col items-center lg:items-start p-6 bg-dashBg text-darkGreen duration-300 `}
      >
        {/* Logo */}
        {reduce ? (
          <Link
            to="/"
            className="flex flex-col justify-center items-start font-black text-darkGreen mb-8 cursor-pointer"
          >
            <h4 className="text-xs lg:text-base text-greenBtn mb-[-0.8rem] ml-[2.3rem]">
              PRO
            </h4>
            <h3 className="text-xl">Restro</h3>
          </Link>
        ) : (
          <Link
            to="/"
            className="flex flex-col justify-center items-start font-black text-darkGreen mb-8 cursor-pointer"
          >
            <h4 className="text-xs lg:text-base text-greenBtn mb-[-0.8rem] ml-[2.3rem] lg:ml-[5rem]">
              PRO
            </h4>
            <h3 className="text-xl lg:text-4xl">Restro</h3>
          </Link>
        )}
        {/* Admin Photo */}
        <div
          className={`${
            reduce ? "lg:hidden" : null
          }  hidden lg:flex items-center  bg-dashBg rounded-full p-1 cursor-pointer md:mb-8 duration-300`}
        >
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
        <div
          className={`${
            reduce ? "items-center justify-center" : null
          } flex flex-col w-full *:rounded-full *:p-2 *:cursor-pointer`}
        >
          <Link
            to=""
            className="flex flex-row items-center gap-2 hover:bg-dashBgHover mb-4 lg:mb-8"
            onClick={() => setUpdate(!update)}
          >
            <RiDashboardLine
              size={20}
              title="Dashboard"
              className="font-bold"
            />{" "}
            <span
              className={`${
                reduce ? "lg:hidden" : null
              } hidden lg:block duration-300 font-medium`}
            >
              Dashboard
            </span>
          </Link>
          <Link
            to="POS"
            className="flex flex-row items-center gap-2   hover:bg-dashBgHover mb-4"
          >
            <MdSystemUpdateAlt size={20} title="POS" className="font-bold" />
            <span
              className={`${
                reduce ? "lg:hidden" : null
              } hidden lg:block duration-300 font-normal`}
            >
              POS
            </span>
          </Link>
          <Link
            to="orders"
            className="flex flex-row items-center gap-2 hover:bg-dashBgHover mb-4"
          >
            <MdOutlineRestaurant
              size={20}
              title="Orders"
              className="font-bold"
            />{" "}
            <span
              className={`${
                reduce ? "lg:hidden" : null
              } hidden lg:block duration-300 font-normal`}
            >
              Orders
            </span>
          </Link>
          <Link
            to="kitchen"
            className="flex flex-row items-center gap-2  hover:bg-dashBgHover mb-4"
          >
            <TbChefHat size={20} title="Kitchen" className="font-bold" />{" "}
            <span
              className={`${
                reduce ? "lg:hidden" : null
              } hidden lg:block duration-300 font-normal`}
            >
              Kitchen
            </span>
          </Link>

          <div
            className={`${
              reduce ? "lg:hidden" : null
            } hidden lg:flex flex-row items-center font-bold my-4 -translate-x-2 duration-300`}
          >
            <span>Offerings</span>
          </div>
          <Link
            to="reservations"
            className="flex flex-row items-center gap-2  hover:bg-dashBgHover mb-4"
          >
            <TbArmchair2 size={20} title="Reservation" className="font-bold" />{" "}
            <span
              className={`${
                reduce ? "lg:hidden" : null
              } hidden lg:block duration-300 font-normal`}
            >
              Reservation
            </span>
          </Link>
          <Link
            to="customers"
            className="flex flex-row items-center gap-2 hover:bg-dashBgHover mb-4"
          >
            <GoPeople size={20} title="Customers" className="font-bold" />{" "}
            <span
              className={`${
                reduce ? "lg:hidden" : null
              } hidden lg:block duration-300 font-normal`}
            >
              Customers
            </span>
          </Link>
          <Link
            to="invoices"
            className="flex flex-row items-center gap-2 hover:bg-dashBgHover mb-4"
          >
            <TbFileInvoice size={20} title="Invoices" className="font-bold" />{" "}
            <span
              className={`${
                reduce ? "lg:hidden" : null
              } hidden lg:block duration-300 font-normal`}
            >
              Invoices
            </span>
          </Link>

          <div
            className={`${
              reduce ? "lg:hidden" : null
            } hidden lg:flex flex-row items-center font-bold my-4 -translate-x-2 duration-300`}
          >
            <span>Back Office</span>
          </div>
          <Link
            to="users"
            className="flex flex-row items-center gap-2 hover:bg-dashBgHover mb-4"
          >
            <TbUsersGroup size={20} title="Users" />{" "}
            <span
              className={`${
                reduce ? "lg:hidden" : null
              } hidden lg:block duration-300 font-normal`}
            >
              Users
            </span>
          </Link>
          <Link
            to="reports"
            className="flex flex-row items-center gap-2 hover:bg-dashBgHover mb-4"
            onClick={() => setUpdate(!update)}
          >
            <TbPresentationAnalytics
              size={20}
              title="Reports"
              className="font-bold"
            />{" "}
            <span
              className={`${
                reduce ? "lg:hidden" : null
              } hidden lg:block duration-300 font-normal`}
            >
              Reports
            </span>
          </Link>
          <Link
            to="settings"
            className="flex flex-row items-center gap-2 hover:bg-dashBgHover mb-4"
          >
            <RiSettingsLine size={20} title="Settings" className="font-bold" />
            <span
              className={`  ${
                reduce ? "lg:hidden" : "block"
              }  hidden lg:block duration-300 font-normal`}
            >
              Settings
            </span>
          </Link>
          <span
            onClick={() => setReduce(!reduce)}
            className="hidden lg:flex flex-row items-center hover:bg-dashBgHover mb-4 "
          >
            {reduce ? <IoIosArrowForward /> : <IoIosArrowBack />}
          </span>
        </div>
      </div>

      {/*Mobile*/}
      <div
        className={`${
          open ? "w-[5rem] top-0 left-0" : "-translate-x-[5rem]"
        }  w-[5rem] h-full overflow-hidden absolute z-50 flex sm:hidden flex-col items-center lg:items-start p-6 bg-dashBg text-darkGreen duration-300 `}
      >
        {/* Logo */}
        {open ? (
          <Link
            to="/"
            className="flex flex-col justify-center items-start font-black text-darkGreen mb-8 cursor-pointer"
          >
            <h4 className="text-xs lg:text-base text-greenBtn mb-[-0.8rem] ml-[2.3rem]">
              PRO
            </h4>
            <h3 className="text-xl">Restro</h3>
          </Link>
        ) : null}
        {/* Dashboard Nav */}
        <div
          className="items-center
           flex flex-col w-full *:rounded-full *:p-2 *:cursor-pointer"
        >
          <Link
            onClick={() => setOpen(false)}
            to=""
            className="flex flex-row items-center gap-2 hover:bg-dashBgHover mb-4 lg:mb-8"
          >
            <RiDashboardLine
              size={20}
              title="Dashboard"
              className="font-bold"
            />{" "}
          </Link>
          <Link
            onClick={() => setOpen(false)}
            to="POS"
            className="flex flex-row items-center gap-2   hover:bg-dashBgHover mb-4"
          >
            <MdSystemUpdateAlt size={20} title="POS" className="font-bold" />
          </Link>
          <Link
            onClick={() => setOpen(false)}
            to="orders"
            className="flex flex-row items-center gap-2 hover:bg-dashBgHover mb-4"
          >
            <MdOutlineRestaurant
              size={20}
              title="Orders"
              className="font-bold"
            />{" "}
          </Link>
          <Link
            onClick={() => setOpen(false)}
            to="kitchen"
            className="flex flex-row items-center gap-2  hover:bg-dashBgHover mb-4"
          >
            <TbChefHat size={20} title="Kitchen" className="font-bold" />{" "}
          </Link>

          <Link
            onClick={() => setOpen(false)}
            to="reservations"
            className="flex flex-row items-center gap-2  hover:bg-dashBgHover mb-4"
          >
            <TbArmchair2 size={20} title="Reservation" className="font-bold" />{" "}
          </Link>
          <Link
            onClick={() => setOpen(false)}
            to="customers"
            className="flex flex-row items-center gap-2 hover:bg-dashBgHover mb-4"
          >
            <GoPeople size={20} title="Customers" className="font-bold" />{" "}
          </Link>
          <Link
            onClick={() => setOpen(false)}
            to="invoices"
            className="flex flex-row items-center gap-2 hover:bg-dashBgHover mb-4"
          >
            <TbFileInvoice size={20} title="Invoices" className="font-bold" />{" "}
          </Link>

          <Link
            onClick={() => setOpen(false)}
            to="users"
            className="flex flex-row items-center gap-2 hover:bg-dashBgHover mb-4"
          >
            <TbUsersGroup size={20} title="Users" />{" "}
          </Link>
          <Link
            to="reports"
            className="flex flex-row items-center gap-2 hover:bg-dashBgHover mb-4"
            onClick={() => setOpen(false)}
          >
            <TbPresentationAnalytics
              size={20}
              title="Reports"
              className="font-bold"
            />{" "}
          </Link>
          <Link
            to="settings"
            className="flex flex-row items-center gap-2 hover:bg-dashBgHover mb-4"
            onClick={() => setOpen(false)}
          >
            <RiSettingsLine size={20} title="Settings" className="font-bold" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideBarNav;
