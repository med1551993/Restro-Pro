import "./App.css";
import Dashboard from "./components/Dashboard";
import Features from "./pages/Features";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import MainDash from "./components/MainDash";
import POS from "./components/POS";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="" element={<Features />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<MainDash />} />
          <Route path="POS" element={<POS />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
