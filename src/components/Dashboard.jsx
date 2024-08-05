import React, { useState, useEffect } from "react";
import NavDash from "./NavDash";
import SideBarNav from "./SideBarNav";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../store/userSlice";
import axios from "axios";

const Dashboard = () => {
  /*  const dispatch = useDispatch();
  const { data: users, status: userStatus } = useSelector(
    (store) => store.user
  ); */

  /*   useEffect(() => {
    dispatch(fetchUser());
  }, []);
  console.log(users[3]); */

  return (
    <>
      <section className="flex flex-row items-start justify-stretch relative">
        {/* SideBarNav */}
        <div>
          <SideBarNav />
        </div>

        {/* main_Dashboard */}

        <div className="flex-[1]">
          <div className="border-b-2">
            <NavDash />
          </div>
          <>
            <Outlet />
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
