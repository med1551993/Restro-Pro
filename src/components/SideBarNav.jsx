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

const SideBarNav = ({ update, setUpdate }) => {
  const [reduce, setReduce] = useState(false);
  console.log("update", update);
  return (
    <>
      <div
        className={`${
          reduce ? "w-[7rem]" : "lg:w-[15rem] "
        }  hidden sm:flex flex-col items-center lg:items-start p-6 bg-dashBg text-darkGreen duration-300`}
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
          }  hidden lg:flex items-center bg-dashBg rounded-full p-1 cursor-pointer md:mb-8 duration-300`}
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
            reduce ? "items-center" : null
          } flex flex-col w-full *:rounded-full *:p-2 *:cursor-pointer`}
        >
          <Link
            to=""
            className="flex flex-row items-center gap-2 font-bold hover:bg-dashBgHover mb-4 lg:mb-8"
            onClick={() => setUpdate(!update)}
          >
            <RiDashboardLine size={20} title="Dashboard" />{" "}
            <span
              className={`${
                reduce ? "lg:hidden" : null
              } hidden lg:block duration-300`}
            >
              Dashboard
            </span>
          </Link>
          <Link
            to="POS"
            className="flex flex-row items-center gap-2 font-medium  hover:bg-dashBgHover mb-4"
          >
            <MdSystemUpdateAlt size={20} title="POS" />
            <span
              className={`${
                reduce ? "lg:hidden" : null
              } hidden lg:block duration-300`}
            >
              POS
            </span>
          </Link>
          <Link
            to="orders"
            className="flex flex-row items-center gap-2 font-medium hover:bg-dashBgHover mb-4"
          >
            <MdOutlineRestaurant size={20} title="Orders" />{" "}
            <span
              className={`${
                reduce ? "lg:hidden" : null
              } hidden lg:block duration-300`}
            >
              Orders
            </span>
          </Link>
          <Link
            to="kitchen"
            className="flex flex-row items-center gap-2 font-medium hover:bg-dashBgHover mb-4"
          >
            <TbChefHat size={20} title="Kitchen" />{" "}
            <span
              className={`${
                reduce ? "lg:hidden" : null
              } hidden lg:block duration-300`}
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
            className="flex flex-row items-center gap-2 font-medium hover:bg-dashBgHover mb-4"
          >
            <TbArmchair2 size={20} title="Reservation" />{" "}
            <span
              className={`${
                reduce ? "lg:hidden" : null
              } hidden lg:block duration-300`}
            >
              Reservation
            </span>
          </Link>
          <Link
            to="customers"
            className="flex flex-row items-center gap-2 font-medium hover:bg-dashBgHover mb-4"
          >
            <GoPeople size={20} title="Customers" />{" "}
            <span
              className={`${
                reduce ? "lg:hidden" : null
              } hidden lg:block duration-300`}
            >
              Customers
            </span>
          </Link>
          <Link
            to="invoices"
            className="flex flex-row items-center gap-2 font-medium hover:bg-dashBgHover mb-4"
          >
            <TbFileInvoice size={20} title="Invoices" />{" "}
            <span
              className={`${
                reduce ? "lg:hidden" : null
              } hidden lg:block duration-300`}
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
          <div className="flex flex-row items-center gap-2 font-medium hover:bg-dashBgHover mb-4">
            <TbUsersGroup size={20} title="Users" />{" "}
            <span
              className={`${
                reduce ? "lg:hidden" : null
              } hidden lg:block duration-300`}
            >
              Users
            </span>
          </div>
          <div className="flex flex-row items-center gap-2 font-medium hover:bg-dashBgHover mb-4">
            <TbPresentationAnalytics size={20} title="Reports" />{" "}
            <span
              className={`${
                reduce ? "lg:hidden" : null
              } hidden lg:block duration-300`}
            >
              Reports
            </span>
          </div>
          <Link
            to="settings"
            className="flex flex-row items-center gap-2 font-medium hover:bg-dashBgHover mb-4"
          >
            <RiSettingsLine size={20} title="Settings" />
            <span
              className={`  ${
                reduce ? "lg:hidden" : "block"
              }  hidden lg:block duration-300`}
            >
              Settings
            </span>
          </Link>
          <span
            onClick={() => setReduce(!reduce)}
            className="flex flex-row items-center hover:bg-dashBgHover mb-4"
          >
            {reduce ? <IoIosArrowForward /> : <IoIosArrowBack />}
          </span>
        </div>
      </div>
    </>
  );
};

export default SideBarNav;
