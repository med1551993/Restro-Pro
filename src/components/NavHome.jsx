import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiAlignJustify } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const NavHome = () => {
  const [mobile, setMobile] = useState(false);

  return (
    <nav className="w-full">
      <div className="global_container flex gap-10 justify-between items-center p-2 relative">
        <Link
          to="/"
          className="flex flex-col items-end font-black text-darkGreen"
        >
          <h3 className="text-4xl">Restro</h3>
          <h4 className="text-greenBtn flex items-center gap-1 mt-[-0.6rem]">
            PRO
            <span className=" text-black font-bold rounded-full bg-gray-300 text-[0.5rem] px-1">
              SaaS
            </span>
          </h4>
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex flex-row gap-5 text-center">
          <li>
            <Link to="">Features</Link>
          </li>
          <li>
            <Link to="pricing">Pricing</Link>
          </li>
          <li>
            <Link to="contact">Contact</Link>
          </li>
        </ul>

        {/* Mobile */}
        {/* ************************************************************************************************************************************** */}

        <ul
          className={`flex flex-col gap-8 justify- text-center absolute top-0 left-0 w-screen h-screen bg-white z-[999999] pt-20 origin-top animate-open-menu
            ${mobile ? "null" : "hidden"}`}
        >
          <Link
            to="/features"
            className="flex flex-col items-end font-black text-darkGreen absolute top-4 left-4 cursor-pointer"
          >
            <h3 className="text-4xl">Restro</h3>
            <h4 className="text-greenBtn flex items-center gap-1 mt-[-0.6rem]">
              PRO
              <span className=" text-black font-bold rounded-full bg-gray-300 text-[0.5rem] px-1">
                SaaS
              </span>
            </h4>
          </Link>

          <button
            className="absolute top-4 right-4 cursor-pointer"
            onClick={() => setMobile(false)}
          >
            <IoClose size={30} />
          </button>
          <li>
            <Link to="" onClick={() => setMobile(false)}>
              Features
            </Link>
          </li>
          <li>
            <Link to="pricing" onClick={() => setMobile(false)}>
              Pricing
            </Link>
          </li>
          <li>
            <Link to="contact" onClick={() => setMobile(false)}>
              Contact
            </Link>
          </li>
          <div className="flex justify-center gap-5">
            <button>Login</button>
            <button className="bg-greenBtn rounded-full px-3 py-2 text-white transition-all  hover:bg-greenBtnHover">
              Get Started
            </button>
          </div>
        </ul>

        {/* ************************************************************************************************************************************** */}

        <div className="hidden md:flex gap-5 items-center">

        <Link to="/login">
          <button>Login</button>
          </Link>
          <Link to="/register">
            <button className="bg-greenBtn rounded-full px-3 py-2 text-white transition-all  hover:bg-greenBtnHover">
              Get Started
            </button>
          </Link>
        </div>

        <button
          className="md:hidden hover:cursor-pointer"
          onClick={() => setMobile(true)}
        >
          {" "}
          <FiAlignJustify size={30} />{" "}
        </button>
      </div>
    </nav>
  );
};

export default NavHome;
