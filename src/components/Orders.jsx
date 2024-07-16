import React from "react";
import { BiDetail } from "react-icons/bi";
import { IoEllipsisVertical } from "react-icons/io5";

const Orders = ({ orders }) => {
  return (
    <>
      <div className="flex flex-col p-4">
        <h1 className="text-2xl font-semibold mb-6">Orders</h1>
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* item */}
            <div className="flex flex-col border-2 rounded-2xl p-4 gap-4">
              <div className="flex flex-row justify-between items-center">
                <span className="flex flex-row items-center gap-3">
                  <span className="flex justify-center items-center bg-gray-100 text-gray-500 p-3 rounded-full">
                    <BiDetail size={25} />
                  </span>
                  <span className="text-xl font-extrabold">
                    Dine Out-Delivery
                  </span>
                </span>

                <span className="">
                  {" "}
                  <IoEllipsisVertical />
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-gray-100 border-t-2">
                <div className="flex flex-row items-center justify-between mb-8">
                  <div className="flex flex-col gap-1">
                    <span>Token:</span>
                    <span className="text-white bg-blue-950 rounded-full p-3 flex justify-center items-center font-bold">
                      1
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-bold">5:45 AM</span>
                    <span>
                      <p className="text-gray-500">pending</p>{" "}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-7 ">
                  <div className="flex flex-row items-center justify-between pb-2 border-b-2">
                    <span> Idli Sambhar x 1</span>
                    <span>
                      <IoEllipsisVertical />
                    </span>
                  </div>
                  <div className="flex flex-row items-center justify-between pb-2 border-b-2">
                    <span> Idli Sambhar x 1</span>
                    <span>
                      <IoEllipsisVertical />
                    </span>
                  </div>
                  <div className="flex flex-row items-center justify-between pb-2">
                    <span> Idli Sambhar x 1</span>
                    <span>
                      <IoEllipsisVertical />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* item */}
            <div className="flex flex-col border-2 rounded-2xl p-4 gap-4">
              <div className="flex flex-row justify-between items-center">
                <span className="flex flex-row items-center gap-3">
                  <span className="flex justify-center items-center bg-gray-100 text-gray-500 p-3 rounded-full">
                    <BiDetail size={25} />
                  </span>
                  <span className="text-xl font-extrabold">
                    Dine Out-Delivery
                  </span>
                </span>

                <span className="">
                  {" "}
                  <IoEllipsisVertical />
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-gray-100 border-t-2">
                <div className="flex flex-row items-center justify-between mb-8">
                  <div className="flex flex-col gap-1">
                    <span>Token:</span>
                    <span className="text-white bg-blue-950 rounded-full p-3 flex justify-center items-center font-bold">
                      1
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-bold">5:45 AM</span>
                    <span>
                      <p className="text-gray-500">pending</p>{" "}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-7 ">
                  <div className="flex flex-row items-center justify-between pb-2 border-b-2">
                    <span> Idli Sambhar x 1</span>
                    <span>
                      <IoEllipsisVertical />
                    </span>
                  </div>
                  <div className="flex flex-row items-center justify-between pb-2 border-b-2">
                    <span> Idli Sambhar x 1</span>
                    <span>
                      <IoEllipsisVertical />
                    </span>
                  </div>
                  <div className="flex flex-row items-center justify-between pb-2">
                    <span> Idli Sambhar x 1</span>
                    <span>
                      <IoEllipsisVertical />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
