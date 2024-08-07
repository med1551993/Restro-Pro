import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";
import { LuPrinter } from "react-icons/lu";
import { TbArmchair2 } from "react-icons/tb";
import { IoMdBook } from "react-icons/io";
import { HiOutlineReceiptPercent } from "react-icons/hi2";
import { MdOutlinePayment } from "react-icons/md";
import Details from "./Configuration/Details";
import MenuList from "./Configuration/MenuList";
import Tables from "./Configuration/Tables";
import axios from "axios";

const Configuration = () => {
  const navigate = useNavigate();
  /*User*/
  const [user, setUser] = useState();
  /* menu */
  const [menu, setMenu] = useState([]);
  const [menuName, setMenuName] = useState("");
  const [menuCategory, setMenuCategory] = useState("");
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
    const newMenu = {
      name: menuName,
      category: menuCategory,
      price: menuPrice,
    };
    try {
      const response = await axios.post("http://localhost:3600/menu", newMenu);
      const allMenu = [...menu, response.data];
      setMenu(allMenu);
      setMenuName("");
      setMenuCategory("");
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
      occupied: false,
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
    const updatedMenu = {
      id,
      name: menuName,
      category: menuCategory,
      price: menuPrice,
    };
    try {
      const response = await axios.put(
        `http://localhost:3600/menu/${id}`,
        updatedMenu
      );
      setMenu(
        menu.map((item) => (item.id === id ? { ...response.data } : item))
      );
      setMenuName("");
      setMenuCategory("");
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
        const UserResponse = await axios.get("http://localhost:3600/user");
        const MenuResponse = await axios.get("http://localhost:3600/menu");
        const TablesResponse = await axios.get("http://localhost:3600/tables");
        setUser(UserResponse.data[0]);
        setMenu(MenuResponse.data);
        setTables(TablesResponse.data);
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
        <div className="sm:w-[15rem] p-4 *:rounded-full *:p-2 *:cursor-pointer *:transition-all border-r-2">
          <Link
            to=""
            className="flex flex-row items-center gap-2 font-medium hover:bg-dashBgHover mb-4"
          >
            <TbListDetails size={20} title="Details" />
            <span className="hidden sm:block">Details</span>
          </Link>
          <Link
            to="./printSettings"
            className="flex flex-row items-center gap-2 font-medium hover:bg-dashBgHover mb-4"
          >
            <LuPrinter size={20} title="Print Settings" />
            <span className="hidden sm:block">Print Settings</span>
          </Link>
          <Link
            to="./tables"
            className="flex flex-row items-center gap-2 font-medium hover:bg-dashBgHover mb-4"
          >
            <TbArmchair2 size={20} title="Tables" />
            <span className="hidden sm:block">Tables</span>
          </Link>
          <Link
            to="./menu"
            className="flex flex-row items-center gap-2 font-medium hover:bg-dashBgHover mb-4"
          >
            <IoMdBook size={20} title="Menu Items" />
            <span className="hidden sm:block"> Menu Items</span>
          </Link>
          <Link
            to="./Tax"
            className="flex flex-row items-center gap-2 font-medium hover:bg-dashBgHover mb-4"
          >
            <HiOutlineReceiptPercent size={20} title="Tax Setup" />
            <span className="hidden sm:block"> Tax Setup</span>
          </Link>
          <Link
            to="./payment"
            className="flex flex-row items-center gap-2 font-medium hover:bg-dashBgHover mb-4"
          >
            <MdOutlinePayment size={20} title="Payment Types" />
            <span className="hidden sm:block"> Payment Types</span>
          </Link>
        </div>

        {/*  Right Part */}

        <>
          {/* <Outlet /> */}
          {/*   {children == 1 ? <Details data={data} status={status} /> : null}
          {children == 3 ? <Tables data={data} /> : null}
          {children == 4 ? <MenuItems data={data} /> : null} */}

          <Routes>
            <Route
              path=""
              element={<Details user={user} setUser={setUser} />}
            />
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
                <MenuList
                  menu={menu}
                  menuName={menuName}
                  setMenuName={setMenuName}
                  menuCategory={menuCategory}
                  setMenuCategory={setMenuCategory}
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
