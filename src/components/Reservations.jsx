import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { Link, Route, Routes } from "react-router-dom";
import { format } from "date-fns";
import { IoIosPeople } from "react-icons/io";
import { TbArmchair2 } from "react-icons/tb";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";

const Reservations = () => {
  const selectInputRef1 = useRef();
  const selectInputRef2 = useRef();

  const onClear = () => {
    selectInputRef1.current.clearValue();
    selectInputRef2.current.clearValue();
  };
  const [selectedOptionTable, setSelectedOptionTable] = useState([]);

  const [reservationOverlay, setReservationOverlay] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [reservationsSearch, setReservationsSearch] = useState(reservations);
  const [customer, setCustomer] = useState([]);

  const [customerName, setCustomerName] = useState("");
  const [personsNumber, setPersonsNumber] = useState("");
  const [search, setSearch] = useState("");
  const [tables, setTables] = useState([]);
  const [filteredTable, setFilteredTable] = useState([]);

  const [trigger, setTrigger] = useState(false);

  const handlefilter = () => {
    const filteredCustomers = reservations.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setReservationsSearch(filteredCustomers);
  };

  const handleTableEdit = async (table) => {
    const tempTable = tables.find((item) => item.name === table);

    if (tempTable) {
      const updatedTable = {
        ...tempTable,
        occupied: true,
      };

      try {
        const response = await axios.put(
          `http://localhost:3600/tables/${updatedTable.id}`,
          updatedTable
        );
        setFilteredTable(tables.filter((item) => item.occupied === false));
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  const handleTableDelete = async (table) => {
    const tempTable = tables.find((item) => item.name === table);

    if (tempTable) {
      const updatedTable = {
        ...tempTable,
        occupied: false,
      };

      try {
        const response = await axios.put(
          `http://localhost:3600/tables/${updatedTable.id}`,
          updatedTable
        );
        setFilteredTable(tables.filter((item) => item.occupied === false));
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  const handleTableOccupied = () => {
    selectedOptionTable.map((item) => {
      handleTableEdit(item.name);
    });
  };

  const DeleteTableOccupied = (id) => {
    const tempReservation = reservations.find((item) => item.id === id);

    tempReservation.tableArray.map((item) => {
      handleTableDelete(item.name);
    });
  };

  const handleDelete = async (id) => {
    DeleteTableOccupied(id);
    try {
      await axios.delete(`http://localhost:3600/Reservations/${id}`);

      const allReservations = reservationsSearch.filter(
        (item) => item.id !== id
      );

      setReservations(allReservations);
      setReservationsSearch(reservations);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = format(new Date(), "dd/MM/yyyy");
    const time = format(new Date(), "HH:mm bb");

    const newReservation = {
      name: customerName.gender + customerName.name,
      personsNumber: personsNumber,
      tableArray: selectedOptionTable,
      date,
      time,
    };
    try {
      const response = await axios.post(
        "http://localhost:3600/Reservations",
        newReservation
      );
      const allReservations = [...reservations, response.data];
      handleTableOccupied();
      setTrigger(!trigger);
      setSelectedOptionTable([]);
      setReservations(allReservations);
      setReservationsSearch(reservations);
      setCustomerName("");
      setPersonsNumber("");
      setReservationOverlay(false);
      setTables(tables.filter((item) => item.occupied === false));
      onClear();
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const Response = await axios.get("http://localhost:3600/Reservations");
        const responseTable = await axios.get("http://localhost:3600/tables");
        const responseCustomers = await axios.get(
          "http://localhost:3600/customers"
        );
        setReservations(Response.data);
        setReservationsSearch(reservations);
        setCustomer(responseCustomers.data);
        setTables(responseTable.data);
        setFilteredTable(tables.filter((item) => item.occupied === false));
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

    fetchReservations();
  }, [trigger]);

  useEffect(() => {
    handlefilter();
  }, [reservations]);

  return (
    <>
      {/* Overlay Add*/}
      <div
        className={`absolute ${
          reservationOverlay ? "flex" : "hidden"
        } items-center justify-center top-0 left-0 z-99999999 w-full h-full bg-black/50`}
      >
        <div className="flex flex-col gap-6 w-[30rem] h-auto bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-extrabold">Adding new Menu</h2>
          <form
            onSubmit={handleSubmit}
            className="relative flex flex-col gap-4"
          >
            <label className="text-[1.1rem] font-medium">Customer's Name</label>

            <Select
              ref={selectInputRef2}
              defaultValue={customerName}
              onChange={setCustomerName}
              options={customer}
              getOptionLabel={(option) => option.gender + " " + option.name}
              getOptionValue={(option) => option.gender + " " + option.name}
            />

            <label className="text-[1.1rem] font-medium">
              Number of persons
            </label>
            <input
              autoComplete="off"
              type="number"
              className=" text-sm w-full px-3 py-2 rounded-[5px] border-[1px] border-gray-300 outline-blue-400 mb-4 required"
              value={personsNumber}
              onChange={(e) => setPersonsNumber(e.target.value)}
            ></input>

            <label className="text-[1.1rem] font-medium">Table Options</label>

            <Select
              ref={selectInputRef1}
              defaultValue={selectedOptionTable}
              onChange={setSelectedOptionTable}
              options={filteredTable}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.name}
              isMulti
            />

            <div className="flex flex-row gap-2 items-center justify-end">
              <span
                className="text-gray-500 font-semibold flex items-center gap-1 bg-gray-200 rounded-lg p-2 cursor-pointer transition-all hover:bg-gray-300"
                onClick={() => {
                  setReservationOverlay(false);
                  setPersonsNumber("");
                  setCustomerName("");
                  setSelectedOptionTable([]);
                  onClear();
                }}
              >
                Close
              </span>
              <button
                disabled={
                  !customerName ||
                  !personsNumber ||
                  selectedOptionTable.length <= 0
                    ? true
                    : false
                }
                onClick={() => handleSubmit}
                type="submit"
                className={`font-semibold bg-greenBtn text-white rounded-lg p-2 transition-all 
                           ${
                             !customerName ||
                             !personsNumber ||
                             selectedOptionTable.length <= 0
                               ? "opacity-35"
                               : "hover:bg-greenBtnHover cursor-pointer"
                           }  `}
              >
                Add Reservation
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4">
          <span className="flex flex-row items-center gap-10">
            <h1 className="text-2xl font-semibold">Reservations</h1>
            <button
              className="text-lg text-gray-500 bg-[#f9f9fa] border-2 rounded-lg px-4 py-1 font-bold
          hover:bg-gray-200 transition-all"
              onClick={() => {
                setTrigger(!trigger);
                setReservationOverlay(true);
              }}
            >
              {" "}
              <big>+</big> New
            </button>
          </span>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-row items-center gap-2 text-lg"
          >
            <span className="flex flex-row items-center">
              <input
                type="text"
                placeholder="Search Customer"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={` bg-gray-100 rounded-s-lg ${
                  search === "" ? "rounded-e-lg" : ""
                } px-4 py-1 outline-none`}
              />
              <span
                className={`${search === "" ? "hidden" : "block"}
              text-gray-400 font-medium bg-gray-100 py-1 px-4 rounded-e-lg cursor-pointer`}
                onClick={() => {
                  setReservationsSearch(reservations);
                  setSearch("");
                }}
              >
                X
              </span>
            </span>

            <button
              onClick={() => handlefilter()}
              type="submit"
              className="font-semibold bg-greenBtn text-white rounded-lg px-4 py-1 cursor-pointer transition-all  hover:bg-greenBtnHover"
            >
              Search
            </button>
          </form>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-4">
          {reservationsSearch.map((item) => (
            <div
              className="flex flex-col gap-4 border-2 rounded-xl p-4"
              key={item.id}
            >
              <div className="flex flex-col gap-1 last:border-none" item>
                <p className="text-sm font-medium text-gray-500">
                  {item.date} @ {item.time}
                </p>
                <div className="flex felx-row justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <div className="flex flex-row gap-4 text-sm font-medium">
                      <div className="flex flex-row items-center ">
                        <IoIosPeople size={20} /> &nbsp; {item.personsNumber}{" "}
                        people
                      </div>
                      <div className="flex flex-row items-center">
                        <TbArmchair2 size={20} /> &nbsp;
                        {item.tableArray
                          .map(
                            (item, index) => "T" + item.name.match(/(\d+)/)[0]
                          )
                          .toSorted()
                          .join(",")}
                      </div>
                    </div>
                  </div>

                  <div>
                    <HiArrowTopRightOnSquare
                      size={20}
                      className="text-gray-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <span className="grid grid-cols-2 items-center gap-3">
                <Link
                  to={`./edit/${item.id}`}
                  className="text-center px-4 py-1 text-gray-500 font-semibold text-xl bg-gray-100 rounded-lg transition-all hover:bg-gray-200"
                >
                  {" "}
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-4 py-1 text-[red] font-semibold text-xl bg-gray-100 rounded-lg transition-all hover:bg-[red] hover:text-white"
                >
                  {" "}
                  Delete
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Reservations;
