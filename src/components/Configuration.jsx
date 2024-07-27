import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";
import { LuPrinter } from "react-icons/lu";
import { TbArmchair2 } from "react-icons/tb";
import { IoMdBook } from "react-icons/io";
import { HiOutlineReceiptPercent } from "react-icons/hi2";
import { MdOutlinePayment } from "react-icons/md";
import Details from "./Configuration/Details";
import MenuItems from "./Configuration/MenuItems";
import Tables from "./Configuration/Tables";
import axios from "axios";

const Configuration = () => {
  const navigate = useNavigate();
  /* menu */
  const [menu, setMenu] = useState([]);
  const [menuName, setMenuName] = useState("");
  const [menuPrice, setMenuPrice] = useState("");
  const [menuOverlay, setMenuOverlay] = useState(false);
  /* tables */
  const [tables, setTables] = useState([]);
  const [tableName, setTableName] = useState("");
  const [tableFloor, setTableFloor] = useState("");
  const [tableCapacity, setTableCapacity] = useState("");
  const [tableOverlay, setTableOverlay] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMenu = { name: menuName, price: menuPrice };
    try {
      const response = await axios.post("http://localhost:3600/menu", newMenu);
      const allMenu = [...menu, response.data];
      setMenu(allMenu);
      setMenuName("");
      setMenuPrice("");
      setMenuOverlay(false);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleTableSubmit = async (e) => {
    e.preventDefault();
    const newTable = {
      name: tableName,
      floor: tableFloor,
      capacity: tableCapacity,
    };
    try {
      const response = await axios.post(
        "http://localhost:3600/tables",
        newTable
      );
      const allTables = [...tables, response.data];
      setTables(allTables);
      setTableName("");
      setTableFloor("");
      setTableCapacity("");
      setTableOverlay(false);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3600/menu/${id}`);
      const allMenu = menu.filter((item) => item.id !== id);
      setMenu(allMenu);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleTableDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3600/tables/${id}`);
      const allTables = tables.filter((item) => item.id !== id);
      setTables(allTables);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleEditMenu = async (id) => {
    const updatedMenu = { id, name: menuName, price: menuPrice };
    try {
      const response = await axios.put(
        `http://localhost:3600/menu/${id}`,
        updatedMenu
      );
      setMenu(
        menu.map((item) => (item.id === id ? { ...response.data } : item))
      );
      setMenuName("");
      setMenuPrice("");
      navigate(-1);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleEditTable = async (id) => {
    const updatedTable = {
      id,
      name: tableName,
      floor: tableFloor,
      capacity: tableCapacity,
    };
    try {
      const response = await axios.put(
        `http://localhost:3600/tables/${id}`,
        updatedTable
      );
      setTables(
        tables.map((item) => (item.id === id ? { ...response.data } : item))
      );
      setTableName("");
      setTableFloor("");
      setTableCapacity("");
      navigate(-1);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const MenuResponse = await axios.get("http://localhost:3600/menu");
        const TablesResponse = await axios.get("http://localhost:3600/tables");
        setMenu(MenuResponse.data);
        setTables(TablesResponse.data);
        console.log("menu", menu);
        console.log("tables", tables);
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

    fetchMenu();
  }, []);

  return (
    <>
      <section className="flex flex-row h-screen">
        {/*  left Part */}
        <div className="w-[15rem] p-4 *:rounded-full *:p-2 *:cursor-pointer *:transition-all border-r-2">
          <Link to="." className="hidden lg:block hover:bg-dashBgHover mb-4">
            <div className="flex flex-row items-center gap-2 font-medium ">
              <TbListDetails size={20} /> Details
            </div>
          </Link>
          <Link
            to="./printSettings"
            className="hidden lg:block hover:bg-dashBgHover mb-4"
          >
            <div className="flex flex-row items-center gap-2 font-medium">
              <LuPrinter size={20} />
              Print Settings
            </div>
          </Link>
          <Link
            to="./tables"
            className="hidden lg:block hover:bg-dashBgHover mb-4"
          >
            <div className="flex flex-row items-center gap-2 font-medium">
              <TbArmchair2 size={20} />
              Tables
            </div>
          </Link>
          <Link
            to="./menu"
            className="hidden lg:block hover:bg-dashBgHover mb-4"
          >
            <div className="flex flex-row items-center gap-2 font-medium">
              <IoMdBook size={20} />
              Menu Items
            </div>
          </Link>
          <Link
            to="./Tax"
            className="hidden lg:block hover:bg-dashBgHover mb-4"
          >
            <div className="flex flex-row items-center gap-2 font-medium">
              <HiOutlineReceiptPercent size={20} />
              Tax Setup
            </div>
          </Link>
          <Link
            to="./payment"
            className="hidden lg:block hover:bg-dashBgHover mb-4"
          >
            <div className="flex flex-row items-center gap-2 font-medium">
              <MdOutlinePayment size={20} />
              Payment Types
            </div>
          </Link>
        </div>

        {/*  Right Part */}

        <>
          {/* <Outlet /> */}
          {/*   {children == 1 ? <Details data={data} status={status} /> : null}
          {children == 3 ? <Tables data={data} /> : null}
          {children == 4 ? <MenuItems data={data} /> : null} */}

          <Routes>
            <Route path="/" element={<Details />} />
            <Route
              path="/tables/*"
              element={
                <Tables
                  tables={tables}
                  tableName={tableName}
                  setTableName={setTableName}
                  tableFloor={tableFloor}
                  setTableFloor={setTableFloor}
                  tableCapacity={tableCapacity}
                  setTableCapacity={setTableCapacity}
                  tableOverlay={tableOverlay}
                  setTableOverlay={setTableOverlay}
                  handleTableSubmit={handleTableSubmit}
                  handleTableDelete={handleTableDelete}
                  handleEditTable={handleEditTable}
                />
              }
            />
            <Route
              path="/menu/*"
              element={
                <MenuItems
                  menu={menu}
                  menuName={menuName}
                  setMenuName={setMenuName}
                  menuPrice={menuPrice}
                  setMenuPrice={setMenuPrice}
                  menuOverlay={menuOverlay}
                  setMenuOverlay={setMenuOverlay}
                  handleSubmit={handleSubmit}
                  handleDelete={handleDelete}
                  handleEditMenu={handleEditMenu}
                />
              }
            />
            <Route path="*" element={<div> nothing here</div>} />
          </Routes>
        </>
      </section>
    </>
  );
};

export default Configuration;
