import React from "react";
import { IoIosPeople } from "react-icons/io";
import { TbArmchair2 } from "react-icons/tb";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { MdOutlineAccessTime } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { TbToolsKitchen2 } from "react-icons/tb";
import { Reservations } from "../DummyDate";
import { Current_Orders } from "../DummyDate";
import { Top_Selling_Items } from "../DummyDate";

const MainDash = () => {
  return (
    <>
      <div className="flex flex-col p-4">
        <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 2xl:grid-cols-3">
            {/* Reservation */}

            <div className="flex flex-col border-2 rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-2">Reservation</h2>
              {!Reservations
                ? "no reservations yet"
                : Reservations &&
                Reservations.map((reservation) => (
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
                            className="text-gray-500 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
            </div>

            {/* Current_Orders */}
            <div className="flex flex-col border-2 rounded-2xl gap-5 p-6">
              <h2 className="text-xl font-semibold mb-2">Current Orders</h2>
              {Current_Orders.map((order) => (
                <div
                  className="flex flex-row justify-between items-center"
                  key={order.id}
                >
                  <div className="flex gap-4">
                    <span className="flex justify-center items-center bg-gray-100 text-gray-500 p-3 rounded-xl">
                      <TbToolsKitchen2 size={25} />
                    </span>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-base font-semibold">{order.name}</h2>
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
            <div className="flex flex-col lg:col-span-2 2xl:col-span-1 border-2 rounded-2xl gap-5 p-6">
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
                    <span className="flex justify-center items-center bg-gray-100 text-gray-500 p-3 rounded-xl">
                      <TbToolsKitchen2 size={25} />
                    </span>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-base font-semibold">{item.name}</h2>
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

          <div className="grid gap-8 md:grid-cols-2 2xl:grid-cols-3">
            {/*  Total Sales */}
            <div className="flex flex-col border-2 rounded-2xl gap-5 p-6">
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
            <div className="flex flex-col border-2 rounded-2xl gap-5 p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">Average Order Value</h2>

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
            <div className="flex flex-col border-2 rounded-2xl gap-5 p-6">
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
            <div className="flex flex-col border-2 rounded-2xl gap-5 p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">Repeat Customer Rate</h2>

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
            <div className="flex flex-col border-2 rounded-2xl gap-5 p-6">
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
            <div className="flex flex-col border-2 rounded-2xl gap-5 p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">Loyalty Card Members</h2>

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
    </>
  );
};

export default MainDash;
