import React, { useState } from "react";
import { div, Outlet } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";
import { LuPrinter } from "react-icons/lu";
import { TbArmchair2 } from "react-icons/tb";
import { IoMdBook } from "react-icons/io";
import { HiOutlineReceiptPercent } from "react-icons/hi2";
import { MdOutlinePayment } from "react-icons/md";
import Details from "./Configuration/Details";
import MenuItems from "./Configuration/MenuItems";
import Tables from "./Configuration/Tables";

const Configuration = ({data, status }) => {
  const [children, setChildren] = useState(1);

  return (
    <>
      <section className="flex flex-row h-screen">
        {/*  left Part */}
        <div className="w-[15rem] p-4 *:rounded-full *:p-2 *:cursor-pointer *:transition-all border-r-2">
          <div
            className={`hidden lg:block hover:bg-dashBgHover mb-4 ${
              children == 1 ? "bg-dashBgHover" : ""
            }`}
            onClick={() => setChildren(1)}
          >
            <div className="flex flex-row items-center gap-2 font-medium ">
              <TbListDetails size={20} /> Details
            </div>
          </div>
          <div className="hidden lg:block hover:bg-dashBgHover mb-4">
            <div className="flex flex-row items-center gap-2 font-medium">
              <LuPrinter size={20} />
              Print Settings
            </div>
          </div>
          <div
            className={`hidden lg:block hover:bg-dashBgHover mb-4 ${
              children == 3 ? "bg-dashBgHover" : ""
            }`}
            onClick={() => setChildren(3)}
          >
            <div className="flex flex-row items-center gap-2 font-medium">
              <TbArmchair2 size={20} />
              Tables
            </div>
          </div>
          <div
            className={`hidden lg:block hover:bg-dashBgHover mb-4 ${
              children == 4 ? "bg-dashBgHover" : ""
            }`}
            onClick={() => setChildren(4)}
          >
            <div className="flex flex-row items-center gap-2 font-medium">
              <IoMdBook size={20} />
              Menu Items
            </div>
          </div>
          <div className="hidden lg:block hover:bg-dashBgHover mb-4">
            <div className="flex flex-row items-center gap-2 font-medium">
              <HiOutlineReceiptPercent size={20} />
              Tax Setup
            </div>
          </div>
          <div className="hidden lg:block hover:bg-dashBgHover mb-4">
            <div className="flex flex-row items-center gap-2 font-medium">
              <MdOutlinePayment size={20} />
              Payment Types
            </div>
          </div>
        </div>

        {/*  Right Part */}

        <>
          {/* <Outlet /> */}
          {children==1 ? <Details data={data} status={status}/> : null}
          {children==3 ? <Tables data={data}/> : null}
          {children==4 ? <MenuItems data={data}/> : null}
        </>
      </section>
    </>
  );
};

export default Configuration;
