import React from "react";
import { IoIosPeople } from "react-icons/io";
import { TbArmchair2 } from "react-icons/tb";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { MdOutlineAccessTime } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { TbToolsKitchen2 } from "react-icons/tb";
import reservations_img from "../images/reservations.jpg";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const MainDash = ({
  user,
  reservations,
  orders,
  sellingItems,
  averageOrderValue,
  totalOrders,
  totalSales,
  totalCustomers,
  newCustomers,
}) => {
  return (
    <>
      <div className="flex flex-col p-4">
        <h1 className="text-2xl font-normal mb-6">Dashboard</h1>
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 2xl:grid-cols-3">
            {/* Reservation */}

            <div className="flex flex-col border-[1px] rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-2">Reservation</h2>
              {reservations.length == 0 ? (
                <div className="flex flex-col items-center justify-center">
                  <img
                    className=" w-[15rem] h-[15rem]"
                    src={reservations_img}
                    alt="No Reservations found for Today!"
                  />
                  <span className="text-gray-500">
                    No Reservations found for Today!
                  </span>
                </div>
              ) : (
                reservations.map((reservation) => (
                  <div
                    className="flex flex-col gap-1 border-b-[1px] py-4 last:border-none"
                    key={reservation.id}
                  >
                    <p className="text-xs font-medium text-gray-500">
                      {reservation.date} @ {reservation.time}
                    </p>
                    <div className="flex felx-row justify-between items-start">
                      <div className="flex flex-col gap-1">
                        <h2 className="text-base font-semibold">
                          {reservation.name}
                        </h2>
                        <div className="flex flex-row gap-4 font-medium text-xs">
                          <div className="flex flex-row items-center ">
                            <IoIosPeople size={15} /> &nbsp;{" "}
                            {reservation.personsNumber} people
                          </div>
                          <div className="flex flex-row items-center">
                            <TbArmchair2 size={15} /> &nbsp;{" "}
                            {reservation.tableArray
                              .map(
                                (item, index) =>
                                  "T" + item.name.match(/(\d+)/)[0]
                              )
                              .toSorted()
                              .join(", ")}
                          </div>
                        </div>
                      </div>

                      <div>
                        <HiArrowTopRightOnSquare
                          size={20}
                          className="text-gray-500 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Current_Orders */}
            <div className="flex flex-col border-[1px] rounded-2xl gap-5 p-6">
              <h2 className="text-lg font-semibold mb-2">Current Orders</h2>
              {orders
                ?.filter((order) => order.paid == false)
                .map((order) =>
                  order.data.map((item) => (
                    <div
                      className="flex flex-row justify-between items-center"
                      key={item.id}
                    >
                      <div className="flex gap-4">
                        <span className="flex justify-center items-center bg-gray-100 text-gray-500 p-3 rounded-xl">
                          <TbToolsKitchen2 size={20} />
                        </span>
                        <div className="flex flex-col gap-1">
                          <h2 className="text-sm font-semibold">{item.name}</h2>
                          <div className="flex flex-row gap-4 text-xs font-medium">
                            <div className="flex flex-row items-center">
                              <TbArmchair2 size={15} /> &nbsp;{" "}
                              {order.table.length !== 0
                                ? order.table
                                : "Dine out / Delivery"}
                            </div>
                            <div className="flex flex-row items-center ">
                              Qty: {item.qty}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        {item.status === "Preparing" ? (
                          <MdOutlineAccessTime
                            size={20}
                            className="text-[#f6b11d]"
                          />
                        ) : item.status == "Ready" ? (
                          <FaCheck size={20} className="text-greenBtn" />
                        ) : null}
                      </div>
                    </div>
                  ))
                )}
            </div>

            {/* Top_Selling_Items */}
            <div className="flex flex-col lg:col-span-2 2xl:col-span-1 border-[1px] rounded-2xl gap-5 p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold">Top Selling Items</h2>
              </div>

              {sellingItems.length == 0
                ? "no items"
                : sellingItems.map((item, index) => (
                    <div
                      className="flex flex-row justify-between items-center"
                      key={index}
                    >
                      <div className="flex gap-4">
                        <span className="flex justify-center items-center bg-gray-100 text-gray-500 p-3 rounded-xl">
                          <TbToolsKitchen2 size={20} />
                        </span>
                        <div className="flex flex-col gap-1">
                          <h2 className="text-sm font-semibold">{item.name}</h2>
                          <div className="flex flex-row gap-4">
                            <p className="text-xs font-medium text-gray-500">
                              {user.currency}
                              {item.price}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <span className="text-lg font-bold">{item.qty}</span>
                      </div>
                    </div>
                  ))}
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 2xl:grid-cols-3">
            {/*  Total Sales */}
            <div className="flex flex-col border-[1px] rounded-2xl gap-5 p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold">Total Sales</h2>
              </div>
              <div>
                <span className="text-3xl font-extrabold">
                  {" "}
                  {user.currency}
                  {totalSales}
                </span>
              </div>
            </div>

            {/*  Average Order Value */}
            <div className="flex flex-col border-[1px] rounded-2xl gap-5 p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold">Average Order Value</h2>
              </div>
              <div>
                <span className="text-3xl font-extrabold">
                  {user.currency}
                  {averageOrderValue}
                </span>
              </div>
            </div>

            {/*  Total Orders */}
            <div className="flex flex-col border-[1px] rounded-2xl gap-5 p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold">Total Orders</h2>
              </div>
              <div>
                <span className="text-3xl font-extrabold">{totalOrders}</span>
              </div>
            </div>

            {/* Repeat Customer Rate */}
            {/* <div className="flex flex-col border-[1px] rounded-2xl gap-5 p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold">Repeat Customer Rate</h2>
              </div>
              <div>
                <span className="text-3xl font-extrabold">73%</span>
              </div>
            </div> */}

            {/*  Total Customers */}
            <div className="flex flex-col border-[1px] rounded-2xl gap-5 p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold">Total Customers</h2>
              </div>
              <div>
                <span className="text-3xl font-extrabold">
                  {totalCustomers}
                </span>
              </div>
            </div>

            {/*  New Customers */}
            <div className="flex flex-col border-[1px] rounded-2xl gap-5 p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold">New Customers</h2>
              </div>
              <div>
                <span className="text-3xl font-extrabold">{newCustomers}</span>
              </div>
            </div>

            {/*  View More Data */}
            <Link
              to="reports"
              className="relative group z-50 overflow-hidden flex flex-col border-[1px] rounded-2xl gap-5 p-6 cursor-pointer hover:bg-gray-100 duration-400"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-base font-medium z-20">
                  View More Data in Reports
                </h2>
              </div>

              <span className="text-3xl font-extrabold group-hover:translate-x-3 duration-500 ">
                <IoIosArrowForward />
              </span>

              <div className="absolute group-hover:translate-x-3 duration-500 w-[14rem] h-full bg-greenBtn  rounded-bl-full top-0 right-0 z-10"></div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainDash;
