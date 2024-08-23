import React, { useState, useEffect } from "react";
import { FiAlignJustify } from "react-icons/fi";
import photo_profile from "../images/photo_profile.png";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { TbLogout, TbUvIndex } from "react-icons/tb";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { IoIosArrowForward } from "react-icons/io";
import { RiDashboardLine } from "react-icons/ri";
import { MdOutlineRestaurant } from "react-icons/md";
import { TbChefHat } from "react-icons/tb";
import { GoPeople } from "react-icons/go";
import { TbFileInvoice } from "react-icons/tb";
import { TbUsersGroup } from "react-icons/tb";
import { TbPresentationAnalytics } from "react-icons/tb";
import { TbArmchair2 } from "react-icons/tb";
import { RiSettingsLine } from "react-icons/ri";
import { MdSystemUpdateAlt } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { LuPrinter } from "react-icons/lu";
import { IoMdBook } from "react-icons/io";
import { HiOutlineReceiptPercent } from "react-icons/hi2";
import { MdOutlinePayment } from "react-icons/md";

const routesPath = [
  { name: "Dashboard", icon: <RiDashboardLine />, endpoint: "" },
  { name: "POS", icon: <MdSystemUpdateAlt />, endpoint: "POS" },
  { name: "Orders", icon: <MdOutlineRestaurant />, endpoint: "orders" },
  { name: "Kitchen", icon: <TbChefHat />, endpoint: "kitchen" },
  { name: "Reservations", icon: <TbArmchair2 />, endpoint: "reservations" },
  { name: "Customers", icon: <GoPeople />, endpoint: "customers" },
  { name: "Invoices", icon: <TbFileInvoice />, endpoint: "invoices" },
  { name: "Users", icon: <TbUsersGroup />, endpoint: "users" },
  { name: "Reports", icon: <TbPresentationAnalytics />, endpoint: "reports" },
  { name: "Store Details", icon: <RiSettingsLine />, endpoint: "settings" },
  {
    name: "Print Settings",
    icon: <LuPrinter />,
    endpoint: "settings/printSettings",
  },
  { name: "Store Tables", icon: <TbArmchair2 />, endpoint: "settings/tables" },
  { name: "Menu Items", icon: <IoMdBook />, endpoint: "settings/menu" },
  {
    name: "Tax Setup",
    icon: <HiOutlineReceiptPercent />,
    endpoint: "settings/tax-setup",
  },
  {
    name: "Payment Types",
    icon: <MdOutlinePayment />,
    endpoint: "settings/payment",
  },
];

const NavDash = ({ setOpen, path, setPath }) => {
  const [pathSearch, setPathSearch] = useState([]);
  const [showPathMenu, setShowPathMenu] = useState(false);

  const handleBlur = () => {
    setTimeout(() => {
      setShowPathMenu(false);
    }, 100);
  };

  useEffect(() => {
    const handleSearchPath = () => {
      if (!path) {
        setPathSearch([]);
        setShowPathMenu(false);
        return;
      }

      if (path.length > 0 && !showPathMenu) {
        setShowPathMenu(true);
      }
      const tempPath = routesPath?.filter((item) =>
        item.name.toLowerCase().includes(path.toLowerCase())
      );
      setPathSearch(tempPath);
    };
    handleSearchPath();
  }, [path]);

  return (
    <>
      <nav className="max-w-full mx-auto py-[1rem] px-[0.7rem] flex items-center justify-between">
        <button
          onClick={() => setOpen(true)}
          className="sm:hidden hover:cursor-pointer"
        >
          <FiAlignJustify size={30} />
        </button>
        <div className="relative flex flex-row gap-2">
          <input
            type="search"
            className="bg-dashBg px-3 py-2 lg:w-[20rem] rounded-full border-none outline-none"
            placeholder="Search..."
            value={path}
            onChange={(e) => setPath(e.target.value)}
            onBlur={handleBlur}
          ></input>
          {showPathMenu && (
            <ul className="scrollbar1 absolute z-50 w-full max-h-56 overflow-y-auto shadow-lg mt-12 left-0 flex flex-col bg-gray-100 rounded-xl p-2">
              {pathSearch.map((item, index) => (
                <Link
                  key={index}
                  onClick={() => {
                    setPath(item.name);
                  }}
                  to={item.endpoint}
                >
                  <li className="flex flex-row items-center justify-between hover:cursor-pointer w-full hover:bg-gray-200 p-2 rounded-xl">
                    <span className="flex flex-row items-center gap-3">
                      {item.icon} {item.name}
                    </span>
                    <span>
                      <IoIosArrowForward />
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="flex items-center bg-dashBg p-1 cursor-pointer rounded-full">
              <img
                src={photo_profile}
                alt="admin"
                className="w-[2rem] rounded-full sm:mr-2"
              />
              <span className="hidden sm:block mr-2">Nancy Patel</span>
              <span className="hidden sm:block">
                <IoIosArrowDown />
              </span>
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute z-50 w-[13rem] right-0 top-[120%] origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="p-2 rouded-full">
              <MenuItem>
                <Link
                  to="settings"
                  className="flex flex-row items-center gap-2 hover:bg-dashBg  p-2 rounded-xl transition-all"
                >
                  <CgProfile size={20} />{" "}
                  <span className="font-light">Profile</span>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to=""
                  className="flex flex-row items-center gap-2 hover:bg-[#f8d7da]  p-2 rounded-xl transition-all text-[red]"
                >
                  <TbLogout size={20} />{" "}
                  <span className="font-light"> Log out</span>
                </Link>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </nav>
    </>
  );
};

export default NavDash;
