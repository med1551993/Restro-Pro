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
import TaxSetup from "./Configuration/TaxSetup";
import PaymentTypes from "./Configuration/PaymentTypes";
import { enqueueSnackbar } from "notistack";
import PrintSetting from "./Configuration/PrintSetting";

const Configuration = ({ user, setUser, printSettings, setPrintSettings }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [ordersStatus, setOrdersStatus] = useState("IDLE");
  const [refresh, setRefresh] = useState(false);

  /* menu */
  const [menu, setMenu] = useState([]);
  const [menuName, setMenuName] = useState("");
  const [menuCategory, setMenuCategory] = useState("");
  const [menuPrice, setMenuPrice] = useState("");
  const [menuTax, setMenuTax] = useState("");
  const [menuOverlay, setMenuOverlay] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  /* tables */
  const [tables, setTables] = useState([]);
  const [tableName, setTableName] = useState("");
  const [tableFloor, setTableFloor] = useState("");
  const [tableCapacity, setTableCapacity] = useState("");
  const [tableOverlay, setTableOverlay] = useState(false);

  /* taxs */
  const [taxs, setTaxs] = useState([]);
  const [taxTitel, setTaxTitle] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [taxOverlay, setTaxOverlay] = useState(false);

  /* Payment Types */
  const [payments, setPayment] = useState([]);
  const [paymentTypeTitle, setPaymentTypeTitle] = useState("");
  const [paymentOverlay, setPaymentOverlay] = useState(false);

  const handleSnackBar = (message, type) => {
    enqueueSnackbar(message, { variant: type });
  };

  const handleRefresh = (message, type) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 500);

    setTimeout(() => {
      handleSnackBar(message, type);
    }, 500);

    setRefresh(true);

    setTimeout(() => {
      setRefresh(false);
    }, 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleRefresh("Menu Added Successfully", "success");

    const newMenu = {
      name: menuName,
      category: menuCategory,
      price: menuPrice,
      tax: menuTax,
    };
    try {
      const response = await axios.post("http://localhost:3600/menu", newMenu);
      const allMenu = [...menu, response.data];
      setMenu(allMenu);
      setMenuName("");
      setMenuCategory("");
      setMenuPrice("");
      setMenuTax("");
      setMenuOverlay(false);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleTableSubmit = async (e) => {
    e.preventDefault();
    handleRefresh("Table Added Successfully!", "success");
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

  const handleTaxsSubmit = async (e) => {
    e.preventDefault();
    handleRefresh("Tax Added Successfully!", "success");
    const newTax = {
      taxTitel: taxTitel,
      taxRate: taxRate,
    };
    try {
      const response = await axios.post("http://localhost:3600/taxs", newTax);
      const allTaxs = [...taxs, response.data];
      setTaxs(allTaxs);
      setTaxTitle("");
      setTaxRate("");
      setTaxOverlay(false);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    handleRefresh("Payment Type Added Successfully!", "success");
    const newType = {
      typeTitel: paymentTypeTitle,
      typeActive: false,
    };
    try {
      const response = await axios.post(
        "http://localhost:3600/PaymentsType",
        newType
      );
      const allTypes = [...payments, response.data];
      setPayment(allTypes);
      setPaymentTypeTitle("");
      setPaymentOverlay(false);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleEditPayment = async (id) => {
    handleRefresh("Data Updated Successfully", "success");

    const tempPaymentType = payments.find((item) => item.id == id);

    const updatedPayment = {
      id,
      typeTitel: tempPaymentType.typeTitel,
      typeActive: !tempPaymentType.typeActive,
    };
    try {
      const response = await axios.put(
        `http://localhost:3600/PaymentsType/${id}`,
        updatedPayment
      );

      setPayment(
        payments.map((item) => (item.id === id ? { ...response.data } : item))
      );
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleTaxDelete = async (id) => {
    handleRefresh("Tax Deleted Successfully", "error");
    try {
      await axios.delete(`http://localhost:3600/taxs/${id}`);
      const allTaxs = taxs.filter((item) => item.id !== id);
      setTaxs(allTaxs);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handlePaymentDelete = async (id) => {
    handleRefresh("Payment Type Deleted Successfully", "error");
    try {
      await axios.delete(`http://localhost:3600/PaymentsType/${id}`);
      const allTypes = payments.filter((item) => item.id !== id);
      setPayment(allTypes);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    handleRefresh("Menu Deleted Successfully", "error");
    try {
      await axios.delete(`http://localhost:3600/menu/${id}`);
      const allMenu = menu.filter((item) => item.id !== id);
      setMenu(allMenu);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleTableDelete = async (id) => {
    handleRefresh("Table Deleted Successfully", "error");
    try {
      await axios.delete(`http://localhost:3600/tables/${id}`);
      const allTables = tables.filter((item) => item.id !== id);
      setTables(allTables);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const convertToBase64 = (e) => {
    console.log("e", e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result); //base64encoded string
      setSelectedImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error", error);
    };
  };

  const handleEditMenu = async (id) => {
    const updatedMenu = {
      id,
      name: menuName,
      category: menuCategory,
      price: menuPrice,
      tax: menuTax,
      image: selectedImage,
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
      handleRefresh("Menu Updated Successfully", "success");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleEditTable = async (id) => {
    handleRefresh("Table Updated Successfully", "success");
    const refreshdTable = {
      id,
      name: tableName,
      floor: tableFloor,
      capacity: tableCapacity,
    };
    try {
      const response = await axios.put(
        `http://localhost:3600/tables/${id}`,
        refreshdTable
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
      setOrdersStatus("LOADING");
      try {
        const MenuResponse = await axios.get("http://localhost:3600/menu");
        const TablesResponse = await axios.get("http://localhost:3600/tables");
        const TaxsResponse = await axios.get("http://localhost:3600/taxs");
        const PaymentTypesResponse = await axios.get(
          "http://localhost:3600/PaymentsType"
        );

        setMenu(MenuResponse.data);
        setTables(TablesResponse.data);
        setTaxs(TaxsResponse.data);
        setPayment(PaymentTypesResponse.data);
        setOrdersStatus("IDLE");
      } catch (err) {
        setOrdersStatus("ERROR");
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
        <div className="sm:w-[15rem] p-4 *:rounded-full *:p-2 *:cursor-pointer *:transition-all border-r-[1px]">
          <Link
            to=""
            className="flex flex-row items-center gap-2 font-medium hover:bg-dashBgHover mb-4"
            onClick={() => setRefresh(!refresh)}
          >
            <TbListDetails size={20} title="Details" />
            <span className="hidden sm:block">Details</span>
          </Link>
          <Link
            to="./printSettings"
            className="flex flex-row items-center gap-2 font-medium hover:bg-dashBgHover mb-4"
            onClick={() => setRefresh(!refresh)}
          >
            <LuPrinter size={20} title="Print Settings" />
            <span className="hidden sm:block">Print Settings</span>
          </Link>
          <Link
            to="./tables"
            className="flex flex-row items-center gap-2 font-medium hover:bg-dashBgHover mb-4"
            onClick={() => setRefresh(!refresh)}
          >
            <TbArmchair2 size={20} title="Tables" />
            <span className="hidden sm:block">Tables</span>
          </Link>
          <Link
            to="./menu"
            className="flex flex-row items-center gap-2 font-medium hover:bg-dashBgHover mb-4"
            onClick={() => setRefresh(!refresh)}
          >
            <IoMdBook size={20} title="Menu Items" />
            <span className="hidden sm:block"> Menu Items</span>
          </Link>
          <Link
            to="./tax-setup"
            className="flex flex-row items-center gap-2 font-medium hover:bg-dashBgHover mb-4"
            onClick={() => setRefresh(!refresh)}
          >
            <HiOutlineReceiptPercent size={20} title="Tax Setup" />
            <span className="hidden sm:block"> Tax Setup</span>
          </Link>
          <Link
            to="./PaymenTypes"
            className="flex flex-row items-center gap-2 font-medium hover:bg-dashBgHover mb-4"
            onClick={() => setRefresh(!refresh)}
          >
            <MdOutlinePayment size={20} title="Payment Types" />
            <span className="hidden sm:block"> Payment Types</span>
          </Link>
        </div>

        {/*  Right Part */}

        <>
          <Routes>
            <Route
              path=""
              element={
                <Details
                  user={user}
                  setUser={setUser}
                  handleRefresh={handleRefresh}
                  loading={loading}
                  setOrdersStatus={setOrdersStatus}
                  refresh={refresh}
                />
              }
            />
            <Route
              path="/printSettings"
              element={
                <PrintSetting
                  printSettings={printSettings}
                  setPrintSettings={setPrintSettings}
                  handleRefresh={handleRefresh}
                  loading={loading}
                  setOrdersStatus={setOrdersStatus}
                  refresh={refresh}
                />
              }
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
                  loading={loading}
                />
              }
            />
            <Route
              path="/menu/*"
              element={
                <MenuList
                  taxs={taxs}
                  menu={menu}
                  menuName={menuName}
                  setMenuName={setMenuName}
                  menuCategory={menuCategory}
                  setMenuCategory={setMenuCategory}
                  menuPrice={menuPrice}
                  setMenuPrice={setMenuPrice}
                  menuTax={menuTax}
                  setMenuTax={setMenuTax}
                  menuOverlay={menuOverlay}
                  setMenuOverlay={setMenuOverlay}
                  handleSubmit={handleSubmit}
                  handleDelete={handleDelete}
                  handleEditMenu={handleEditMenu}
                  loading={loading}
                  handleRefresh={handleRefresh}
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                  convertToBase64={convertToBase64}
                />
              }
            />
            <Route
              path="/tax-setup"
              element={
                <TaxSetup
                  taxs={taxs}
                  taxTitel={taxTitel}
                  setTaxTitle={setTaxTitle}
                  taxRate={taxRate}
                  setTaxRate={setTaxRate}
                  taxOverlay={taxOverlay}
                  setTaxOverlay={setTaxOverlay}
                  handleTaxsSubmit={handleTaxsSubmit}
                  handleTaxDelete={handleTaxDelete}
                  loading={loading}
                />
              }
            />

            <Route
              path="/PaymenTypes"
              element={
                <PaymentTypes
                  payments={payments}
                  paymentTypeTitle={paymentTypeTitle}
                  setPaymentTypeTitle={setPaymentTypeTitle}
                  paymentOverlay={paymentOverlay}
                  setPaymentOverlay={setPaymentOverlay}
                  handlePaymentSubmit={handlePaymentSubmit}
                  handlePaymentDelete={handlePaymentDelete}
                  handleEditPayment={handleEditPayment}
                  loading={loading}
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
