import React from "react";
import NavHome from "../components/NavHome";
import { Routes, Route } from "react-router-dom";
import Features from "./Features";
import Pricing from "./Pricing";
import Contact from "./Contact";
import Footer from "../components/Footer";
import Dashboard from "../components/Dashboard";

const Home = () => {
  return (
    <>
      <NavHome />
      <Routes>
        <Route index path="/features" element={<Features />} />
        <Route index path="/pricing" element={<Pricing />} />
        <Route index path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Home;
