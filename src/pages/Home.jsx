import React from "react";
import NavHome from "../components/NavHome";
import { Routes, Route, Outlet } from "react-router-dom";

import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
     {/*  <NavHome />
      <Routes>
        <Route index path="/features" element={<Features />} />
        <Route index path="pricing" element={<Pricing />} />
        <Route index path="/contact" element={<Contact />} />
      </Routes>
      <Footer /> */}
      <NavHome />
        <Outlet />
      <Footer />
    </>
  );
};

export default Home;
