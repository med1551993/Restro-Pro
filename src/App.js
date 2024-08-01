import "./App.css";
import React from "react";
import Dashboard from "./components/Dashboard";
import Features from "./pages/Features";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import MainDash from "./components/MainDash";
import POS from "./components/POS";
import Configuration from "./components/Configuration";
import Orders from "./components/Orders";
import Customers from "./components/Customers";
import Register from "./components/Register";
import LogIn from "./components/LogIn";
import Invoices from "./components/Invoices";
import Kitchen from "./components/Kitchen";
import Reservations from "./components/Reservations";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          {/* Public  Routes */}
          <Route path="" element={<Features />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="contact" element={<Contact />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<LogIn />} />
        </Route>

        {/* Protected Routes */}
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="" element={<MainDash />} />
          <Route path="POS/*" element={<POS />} />
          <Route path="orders" element={<Orders />} />
          <Route path="kitchen" element={<Kitchen />} />
          <Route path="reservations" element={<Reservations />} />

          <Route path="customers/*" element={<Customers />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="settings/*" element={<Configuration />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
