import "./App.css";
import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Features from "./pages/Features";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import MainDash from "./components/MainDash";
import POS from "./components/POS";
import Configuration from "./components/Configuration";
import Tables from "./components/Configuration/Tables";
import MenuItems from "./components/Configuration/MenuItems";
import Details from "./components/Configuration/Details";
import api from "./api/user";
import axios from "axios";
import { fetchUser } from "./store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Orders from "./components/Orders";
import Customers from "./components/Customers";
import Register from "./components/Register";
import LogIn from "./components/LogIn";

function App() {
  const dispatch = useDispatch();
  const { data: users, status: userStatus } = useSelector(
    (store) => store.user
  );

  const [reservations, setReservations] = useState([]);
  const [menu, setMenu] = useState([]);
  
/*   useEffect(() => {
    dispatch(fetchUser());
  }, []);
 */
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="" element={<Features />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="contact" element={<Contact />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<LogIn />} />

        </Route>
        <Route path="dashboard" element={<Dashboard />}>
          <Route
            path=""
            element={<MainDash reservations={users.Reservations} />}
          />
          <Route path="POS" element={<POS menu={users.menu} />} />
          <Route
            path="orders"
            element={<Orders orders={users.Current_Orders} />}
          />
          <Route path="customers" element={<Customers customers={users.customers}/>} />
          <Route
            path="settings"
            element={<Configuration data={users} status={userStatus} />}
          >
            <Route index element={<Details />} />
            <Route path="tables" element={<Tables />} />
            <Route path="menu" element={<MenuItems />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
