import React, { useState, useEffect } from "react";
import NavDash from "./NavDash";
import SideBarNav from "./SideBarNav";
import MainDash from "./MainDash";
import POS from "./POS";
import Configuration from "./Configuration";
import api from "../api/user";
import { Outlet } from "react-router-dom";

const Dashboard = ({menu,reservations,orders}) => {


  return (
    <>
      <section className="flex flex-row relative">
        {/* SideBarNav */}

        <SideBarNav />

        {/* main_Dashboard */}

        <div className="flex-[1]">
          <div className="border-b-2">
            <NavDash />
          </div>
          <>
            <Outlet menu={menu} orders={orders} reservations={reservations}/> 
           {/*  {children == 1 ? <MainDash reservations={reservations} /> : null}
            {children == 2 ? (
              <POS menu={menu} />
            ) : null}
            {children == 10 ? <Configuration /> : null} */}
          </>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
