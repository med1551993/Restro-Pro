import React from "react";
import NavDash from "./NavDash";
import SideBarNav from "./SideBarNav";
import { Routes, Route, Outlet } from "react-router-dom";
import MainDash from "./MainDash";
import POS from "./POS";

const Dashboard = () => {
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
              <Outlet/>
          </>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
