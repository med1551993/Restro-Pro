import "./App.css";
import React from "react";
import Dashboard from "./components/Dashboard";
import Features from "./pages/Features";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Register from "./components/Register";
import LogIn from "./components/LogIn";

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
        <Route path="dashboard/*" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
