import React, { useState, useEffect } from "react";
import NavDash from "./NavDash";
import SideBarNav from "./SideBarNav";
import { Outlet } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import MainDash from "./MainDash";
import POS from "./POS";
import Orders from "./Orders";
import Kitchen from "./Kitchen";
import Reservations from "./Reservations";
import Customers from "./Customers";
import Invoices from "./Invoices";
import Configuration from "./Configuration";

const Dashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [orders, setOrders] = useState([]);

  const [update, setUpdate] = useState(true);

const TopSellingItems = () =>{
  const tempItems = orders.map((order) => order.data)
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reservationsResponse = await axios.get(
          "http://localhost:3600/Reservations"
        );
        const ordersResponse = await axios.get("http://localhost:3600/orders");

        setReservations(reservationsResponse.data);
        setOrders(ordersResponse.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };

    fetchData();
  }, [update]);


  return (
    <>
      <section className="flex flex-row  items-start justify-stretch relative">
        {/* SideBarNav */}
        <div className="self-stretch bg-dashBg">
          <SideBarNav setUpdate={setUpdate} update={update} />
        </div>

        {/* main_Dashboard */}

        <div className="flex-[1]">
          <div className="border-b-2">
            <NavDash />
          </div>
          <>
            {/*  <Outlet reservations={reservations} /> */}
            <Routes>
              <Route
                path=""
                element={
                  <MainDash reservations={reservations} orders={orders} />
                }
              />
              <Route path="POS/*" element={<POS />} />
              <Route path="orders" element={<Orders />} />
              <Route path="kitchen" element={<Kitchen />} />
              <Route path="reservations" element={<Reservations />} />

              <Route path="customers/*" element={<Customers />} />
              <Route path="invoices/*" element={<Invoices />} />
              <Route path="settings/*" element={<Configuration />} />
            </Routes>

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
