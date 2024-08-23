import React, { useState, useEffect } from "react";
import NavDash from "./NavDash";
import SideBarNav from "./SideBarNav";
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
import Reports from "./Reports";
import { format } from "date-fns";
import Users from "./Users";

const Dashboard = () => {
  /*Routes Path */
  const [path, setPath] = useState("");
  /* open-close Mobile Nav */
  const [open, setOpen] = useState(false);
  /* User */
  const [user, setUser] = useState([]);
  /*printSetting*/
  const [printSettings, setPrintSettings] = useState();

  const todaySellingItems = format(new Date(), "yyyy-MM-dd");
  const todayReservations = format(new Date(), "dd/MM/yyyy");

  const [reservations, setReservations] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [update, setUpdate] = useState(true);
  const [sellingItems, setSellingItems] = useState([]);
  const [averageOrderValue, setAverageOrderValue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [newCustomers, setNewCustomers] = useState(0);

  const handleTotalOrders = (array) => {
    const total = array.length;

    setTotalOrders(total);
  };

  const handleTotalSales = () => {
    let tempItems = [];
    orders
      .filter((order) => order.paid == true)
      .map((order) =>
        order.data.map((item) =>
          tempItems.push({
            name: item.name,
            price: item.price,
            qty: item.qty,
            date: order.date2,
          })
        )
      );
    const filteredItems = tempItems.filter(
      (item) => item.date == todaySellingItems
    );

    const Average = filteredItems.reduce((totalAverage, item) => {
      return (totalAverage = totalAverage + item.price * item.qty);
    }, 0);

    return setTotalSales(Average);
  };

  const handleTotaOrders = () => {
    let tempItems = [];
    orders
      .filter((order) => order.paid == false)
      .map((order) =>
        order.data.map((item) =>
          tempItems.push({
            name: item.name,
            price: item.price,
            qty: item.qty,
            date: order.date2,
          })
        )
      );
    const filteredItems = tempItems.filter(
      (item) => item.date == todaySellingItems
    );
    handleTotalOrders(filteredItems);
  };

  const topSellingItems = () => {
    let tempItems = [];

    orders
      .filter((order) => order.paid == true)
      .map((order) =>
        order.data.map((item) =>
          tempItems.push({
            name: item.name,
            price: item.price,
            qty: item.qty,
            date: order.date2,
          })
        )
      );
    const filteredItems = tempItems.filter(
      (item) => item.date == todaySellingItems
    );

    /*regrouper les élément selon le nom */
    for (let i = 0; i < filteredItems.length - 1; i++) {
      for (let j = i + 1; j < filteredItems.length; j++) {
        if (filteredItems[j].name == filteredItems[i].name) {
          filteredItems[i].qty = filteredItems[i].qty + filteredItems[j].qty;
          filteredItems.splice(j, 1);
        }
      }
    }
    /*Sort the table */
    for (let i = 0; i < filteredItems.length - 1; i++) {
      for (let j = i + 1; j < filteredItems.length; j++) {
        if (filteredItems[j].qty > filteredItems[i].qty) {
          let c = filteredItems[i];
          filteredItems[i] = filteredItems[j];
          filteredItems[j] = c;
        }
      }
    }

    return setSellingItems(filteredItems);
  };

  const AverageOrderValue = () => {
    let tempItems = [];

    orders
      .filter((order) => order.paid == false)
      .map((order) =>
        order.data.map((item) =>
          tempItems.push({
            name: item.name,
            price: item.price,
            qty: item.qty,
            date: order.date2,
          })
        )
      );
    const filteredItems = tempItems.filter(
      (item) => item.date == todaySellingItems
    );

    const Average = filteredItems.reduce((totalAverage, item) => {
      return (totalAverage = totalAverage + item.price * item.qty);
    }, 0);

    return setAverageOrderValue(Average);
  };

  const handleReservations = () => {
    const filteredReservations = reservations.filter(
      (item) => item.date == todayReservations
    );

    return setReservations(filteredReservations);
  };

  const handleCustomers = () => {
    const filteredNewCustomers = customers.filter(
      (item) => item.datetime.slice(0, 10) == todayReservations
    );
    const filteredTotalCustomers = customers.filter(
      (item) => item.datetime.slice(0, 10) <= todayReservations
    );

    setTotalCustomers(filteredTotalCustomers.length);
    setNewCustomers(filteredNewCustomers.length);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reservationsResponse = await axios.get(
          "http://localhost:3600/Reservations"
        );
        const ordersResponse = await axios.get("http://localhost:3600/orders");
        const customersResponse = await axios.get(
          "http://localhost:3600/customers"
        );
        const UserResponse = await axios.get("http://localhost:3600/user");
        const pritSettingResponse = await axios.get(
          "http://localhost:3600/printSettings"
        );
        setReservations(reservationsResponse.data);
        setOrders(ordersResponse.data);
        setCustomers(customersResponse.data);
        setUser(UserResponse.data[0]);
        setPrintSettings(pritSettingResponse.data[0]);
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

  useEffect(() => {
    handleReservations();
    handleCustomers();
    topSellingItems();
    handleTotalSales();
    AverageOrderValue();
    handleTotaOrders();
  }, [orders, update]);

  return (
    <>
      <section className="flex flex-row  items-start justify-stretch relative">
        {/* SideBarNav */}
        <div className="self-stretch bg-dashBg overflow-y-scroll overflow-x-hidden h-screen scrollBar">
          <SideBarNav
            setUpdate={setUpdate}
            update={update}
            open={open}
            setOpen={setOpen}
          />
        </div>

        {/* main_Dashboard */}

        <div className="flex-[1] overflow-y-scroll overflow-x-hidden h-screen scrollBar">
          <div className="border-b-[1px] ">
            <NavDash setOpen={setOpen} path={path} setPath={setPath} />
          </div>
          <div className="">
            <Routes>
              <Route
                path=""
                element={
                  <MainDash
                    user={user}
                    reservations={reservations}
                    orders={orders}
                    customers={customers}
                    sellingItems={sellingItems}
                    averageOrderValue={averageOrderValue}
                    totalOrders={totalOrders}
                    totalSales={totalSales}
                    totalCustomers={totalCustomers}
                    newCustomers={newCustomers}
                  />
                }
              />
              <Route path="POS/*" element={<POS user={user} />} />
              <Route path="orders/*" element={<Orders />} />
              <Route path="kitchen" element={<Kitchen />} />

              <Route path="reservations" element={<Reservations />} />
              <Route path="customers/*" element={<Customers />} />
              <Route path="invoices/*" element={<Invoices user={user} />} />
              <Route path="users/*" element={<Users />} />

              <Route
                path="reports"
                element={
                  <Reports
                    user={user}
                    orders={orders}
                    update={update}
                    setUpdate={setUpdate}
                    customers={customers}
                  />
                }
              />

              <Route
                path="settings/*"
                element={
                  <Configuration
                    user={user}
                    setUser={setUser}
                    printSettings={printSettings}
                    setPrintSettings={setPrintSettings}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
