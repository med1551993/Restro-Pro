import React from "react";
import { IoIosPeople } from "react-icons/io";
import { TbArmchair2 } from "react-icons/tb";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { MdOutlineAccessTime } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { RiDashboardLine } from "react-icons/ri";
import { MdOutlineRestaurant } from "react-icons/md";
import { TbToolsKitchen2 } from "react-icons/tb";
import { TbChefHat } from "react-icons/tb";
import { GoPeople } from "react-icons/go";
import { TbFileInvoice } from "react-icons/tb";
import { TbUsersGroup } from "react-icons/tb";
import { TbPresentationAnalytics } from "react-icons/tb";
import { Reservations } from "../DummyDate";
import { Current_Orders } from "../DummyDate";
import { Top_Selling_Items } from "../DummyDate";
import photo_profile from "../images/photo_profile.png";
import NavDash from "./NavDash";

const Dashboard = () => {
  return (
    <>
      <section className="flex flex-row">
        {/* overlay */}
        <div className="hidden sm:flex flex-col items-center lg:items-start p-6 bg-dashBg w-[6rem] lg:w-[17rem] text-darkGreen">
          {/* Logo */}
          <span
            to="/features"
            className="flex flex-col justify-center items-start font-black text-darkGreen mb-8 cursor-pointer"
          >
            <h4 className="text-xs lg:text-base text-greenBtn mb-[-0.8rem] ml-[2.3rem] lg:ml-[5rem]">PRO</h4>
            <h3 className="text-xl lg:text-4xl">Restro</h3>
          </span>
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
            <div className="flex flex-row items-center gap-2 font-bold  hover:bg-dashBgHover mb-4 lg:mb-8">
              <RiDashboardLine size={20} /> <span className="hidden lg:block">Dashboard</span>
            </div>
            <div className="flex flex-row items-center gap-2 font-medium hover:bg-dashBgHover mb-4">
              <MdOutlineRestaurant size={20} /> <span className="hidden lg:block">POS</span>
            </div>
            <div className="flex flex-row items-center gap-2 font-medium hover:bg-dashBgHover mb-4">
              <MdOutlineRestaurant size={20} /> <span className="hidden lg:block">Orders</span>
            </div>
            <div className="flex flex-row items-center gap-2 font-medium hover:bg-dashBgHover mb-4">
              <TbChefHat size={20} /> <span className="hidden lg:block">Kitchen</span>
            </div>

            <div className="hidden lg:flex flex-row items-center font-bold hover:bg-dashBgHover my-4 -translate-x-2">
              <span>Offerings</span>
            </div>
            <div className="flex flex-row items-center gap-2 font-medium hover:bg-dashBgHover mb-4">
              <TbArmchair2 size={20} /> <span className="hidden lg:block">Reservation</span>
            </div>
            <div className="flex flex-row items-center gap-2 font-medium hover:bg-dashBgHover mb-4">
              <GoPeople size={20} /> <span className="hidden lg:block">Customers</span>
            </div>
            <div className="flex flex-row items-center gap-2 font-medium hover:bg-dashBgHover mb-4">
              <TbFileInvoice size={20} /> <span className="hidden lg:block">Invoices</span>
            </div>

            <div className="hidden lg:flex flex-row items-center font-bold hover:bg-dashBgHover my-4 -translate-x-2">
              <span >Back Office</span>
            </div>
            <div className="flex flex-row items-center gap-2 font-medium hover:bg-dashBgHover mb-4">
            <TbUsersGroup size={20}/> <span className="hidden lg:block">Users</span>
            </div>
            <div className="flex flex-row items-center gap-2 font-medium hover:bg-dashBgHover mb-4">
            <TbPresentationAnalytics size={20}/> <span className="hidden lg:block">Reports</span>
            </div>
          </div>
        </div>
        {/* main_Dashboard */}
        <div className="flex-[1]">
            <div className="border-b-2">
            <NavDash />
            </div>
         
          <div className="flex flex-col p-4">
            <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
            <div className="flex flex-col gap-8">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 2xl:grid-cols-3">
                {/* Reservation */}

                <div className="flex flex-col border-2 rounded-3xl p-6">
                  <h2 className="text-xl font-semibold mb-2">Reservation</h2>

                  {Reservations.map((reservation) => (
                    <div
                      className="flex flex-col gap-1 border-b-2 py-4 last:border-none"
                      key={reservation.id}
                    >
                      <p className="text-sm font-medium text-gray-500">
                        {reservation.date} @ {reservation.time}
                      </p>
                      <div className="flex felx-row justify-between items-start">
                        <div className="flex flex-col gap-1">
                          <h2 className="text-lg font-semibold">
                            {reservation.client}
                          </h2>
                          <div className="flex flex-row gap-4 text-sm font-medium">
                            <div className="flex flex-row items-center ">
                              <IoIosPeople size={20} /> &nbsp;{" "}
                              {reservation.people} people
                            </div>
                            <div className="flex flex-row items-center">
                              <TbArmchair2 size={20} /> &nbsp;{" "}
                              {reservation.table}
                            </div>
                          </div>
                        </div>

                        <div>
                          <HiArrowTopRightOnSquare
                            size={20}
                            className="text-gray-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Current_Orders */}
                <div className="flex flex-col border-2 rounded-3xl gap-5 p-6">
                  <h2 className="text-xl font-semibold mb-2">Current Orders</h2>
                  {Current_Orders.map((order) => (
                    <div
                      className="flex flex-row justify-between items-center"
                      key={order.id}
                    >
                      <div className="flex gap-4">
                        <span className="flex justify-center items-center bg-gray-100 text-gray-500 p-4 rounded-xl">
                          <TbToolsKitchen2 size={25} />
                        </span>
                        <div className="flex flex-col gap-1">
                          <h2 className="text-lg font-semibold">
                            {order.name}
                          </h2>
                          <div className="flex flex-row gap-4 text-sm font-medium">
                            <div className="flex flex-row items-center">
                              <TbArmchair2 size={20} /> &nbsp; {order.table}
                            </div>
                            <div className="flex flex-row items-center ">
                              Qty: {order.quantity}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        {order.prepared ? (
                          <FaCheck size={25} className="text-greenBtn" />
                        ) : (
                          <MdOutlineAccessTime
                            size={25}
                            className="text-[#f6b11d]"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Top_Selling_Items */}
                <div className="flex flex-col border-2 rounded-3xl gap-5 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold">Top Selling Items</h2>

                    <select className="border-2 rounded-3xl px-[0.5rem] py-[0.1rem] text-sm cursor-pointer outline-none text-gray-500">
                      <option className="border-none">today</option>
                      <option>yesterday</option>
                      <option>3 days ago</option>
                    </select>
                  </div>

                  {Top_Selling_Items.map((item) => (
                    <div
                      className="flex flex-row justify-between items-center"
                      key={item.id}
                    >
                      <div className="flex gap-4">
                        <span className="flex justify-center items-center bg-gray-100 text-gray-500 p-4 rounded-xl">
                          <TbToolsKitchen2 size={25} />
                        </span>
                        <div className="flex flex-col gap-1">
                          <h2 className="text-lgl font-semibold">
                            {item.name}
                          </h2>
                          <div className="flex flex-row gap-4 text-sm font-medium">
                            <p className="text-sm font-medium text-gray-500">
                              ${item.price}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <span className="text-xl font-extrabold">
                          {item.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-8 lg:grid-cols-2 2xl:grid-cols-3">
                {/*  Total Sales */}
                <div className="flex flex-col border-2 rounded-3xl gap-5 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold">Total Sales</h2>

                    <select className="border-2 rounded-3xl px-[0.5rem] py-[0.1rem] text-sm cursor-pointer outline-none text-gray-500">
                      <option>today</option>
                      <option>yesterday</option>
                      <option>3 days ago</option>
                    </select>
                  </div>
                  <div>
                    <span className="text-3xl font-extrabold">$1.200</span>
                  </div>
                </div>

                {/*  Average Order Value */}
                <div className="flex flex-col border-2 rounded-3xl gap-5 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold">
                      Average Order Value
                    </h2>

                    <select className="border-2 rounded-3xl px-[0.5rem] py-[0.1rem] text-sm cursor-pointer outline-none text-gray-500">
                      <option>today</option>
                      <option>yesterday</option>
                      <option>3 days ago</option>
                    </select>
                  </div>
                  <div>
                    <span className="text-3xl font-extrabold">$90</span>
                  </div>
                </div>

                {/*  Total Orders */}
                <div className="flex flex-col border-2 rounded-3xl gap-5 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold">Total Orders</h2>

                    <select className="border-2 rounded-3xl px-[0.5rem] py-[0.1rem] text-sm cursor-pointer outline-none text-gray-500">
                      <option>today</option>
                      <option>yesterday</option>
                      <option>3 days ago</option>
                    </select>
                  </div>
                  <div>
                    <span className="text-3xl font-extrabold">49</span>
                  </div>
                </div>

                {/* Repeat Customer Rate */}
                <div className="flex flex-col border-2 rounded-3xl gap-5 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold">
                      Repeat Customer Rate
                    </h2>

                    <select className="border-2 rounded-3xl px-[0.5rem] py-[0.1rem] text-sm cursor-pointer outline-none text-gray-500">
                      <option>today</option>
                      <option>yesterday</option>
                      <option>3 days ago</option>
                    </select>
                  </div>
                  <div>
                    <span className="text-3xl font-extrabold">73%</span>
                  </div>
                </div>

                {/*  Total Customers */}
                <div className="flex flex-col border-2 rounded-3xl gap-5 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold">Total Customers</h2>

                    <select className="border-2 rounded-3xl px-[0.5rem] py-[0.1rem] text-sm cursor-pointer outline-none text-gray-500">
                      <option>today</option>
                      <option>yesterday</option>
                      <option>3 days ago</option>
                    </select>
                  </div>
                  <div>
                    <span className="text-3xl font-extrabold">30</span>
                  </div>
                </div>

                {/*  Loyalty Card Members */}
                <div className="flex flex-col border-2 rounded-3xl gap-5 p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold">
                      Loyalty Card Members
                    </h2>

                    <select className="border-2 rounded-3xl px-[0.5rem] py-[0.1rem] text-sm cursor-pointer outline-none text-gray-500">
                      <option>today</option>
                      <option>yesterday</option>
                      <option>3 days ago</option>
                    </select>
                  </div>
                  <div>
                    <span className="text-3xl font-extrabold">520</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
