import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { IoIosPeople } from "react-icons/io";
import { TbArmchair2 } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";
import Loading from "./Loading";
import Error from "./Error";
import { enqueueSnackbar } from "notistack";

const Reservations = () => {
  const selectInputRef1 = useRef();
  const selectInputRef2 = useRef();

  const onClear = () => {
    selectInputRef1.current.clearValue();
    selectInputRef2.current.clearValue();
  };

  const [loading, setLoading] = useState(false);
  const [ordersStatus, setOrdersStatus] = useState("IDLE");

  const [reservationOverlay, setReservationOverlay] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [reservationsSearch, setReservationsSearch] = useState(reservations);
  const [customer, setCustomer] = useState([]);

  const [customerName, setCustomerName] = useState("");
  const [personsNumber, setPersonsNumber] = useState("");
  const [selectedOptionTable, setSelectedOptionTable] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const [search, setSearch] = useState("");
  const [tables, setTables] = useState([]);
  const [filteredTable, setFilteredTable] = useState([]);

  const [refresh, setRefresh] = useState(false);

  const handlefilter = () => {
    const filteredCustomers = reservations.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setReservationsSearch(filteredCustomers);
  };

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

  const handleDelete = async (id, message, type) => {
    DeleteTableOccupied(id);
    try {
      await axios.delete(`http://localhost:3600/Reservations/${id}`);

      const allReservations = reservationsSearch.filter(
        (item) => item.id !== id
      );

      setReservations(allReservations);
      setReservationsSearch(reservations);
      handleRefresh(message, type);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleRefresh("Customer Added Successfully!", "success");
    const date = selectedDate.slice(0, 10);
    const year = date.slice(0, 4);
    const mounth = date.slice(5, 7);
    const day = date.slice(8, 10);
    const updatedDate = day + "/" + mounth + "/" + year;

    const time = selectedDate.slice(11, 16);

    const newReservation = {
      name: customerName.gender + customerName.name,
      personsNumber: personsNumber,
      tableArray: selectedOptionTable,
      date: updatedDate,
      time: time,
    };
    try {
      const response = await axios.post(
        "http://localhost:3600/Reservations",
        newReservation
      );
      const allReservations = [...reservations, response.data];
      handleTableOccupied();

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
      setOrdersStatus("LOADING");
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

    fetchReservations();
  }, [refresh]);

  useEffect(() => {
    handlefilter();
  }, [reservations]);

  if (ordersStatus == "ERROR") return <Error />;
  if (ordersStatus == "LOADING") return <Loading />;

  return (
    <>
      {/* Overlay Add*/}
      <div
        className={`absolute ${
          reservationOverlay ? "flex" : "hidden"
        } items-center justify-center top-0 left-0 z-99999999 w-full h-full bg-black/50`}
      >
        <div className="flex flex-col gap-6 w-[30rem] h-auto bg-white rounded-2xl p-6 shadow-lg ml-3 mr-3">
          <h2 className="text-lg font-extrabold">Adding new Menu</h2>
          <form
            onSubmit={handleSubmit}
            className="relative flex flex-col gap-4"
          >
            <label className="text-base font-medium">Select Customer</label>

            <Select
              className="text-sm"
              placeholder="Search Customer by Name"
              ref={selectInputRef2}
              defaultValue={customerName}
              onChange={setCustomerName}
              options={customer}
              getOptionLabel={(option) => option.gender + " " + option.name}
              getOptionValue={(option) => option.gender + " " + option.name}
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-4">
                <label className="text-base font-medium">Date</label>
                <input
                  autoComplete="off"
                  type="datetime-local"
                  className=" text-sm w-full px-3 py-2 rounded-[5px] border-[1px] border-gray-300 outline-blue-400 required"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                ></input>
              </div>
              <div className="flex flex-col gap-4">
                <label className="text-base font-medium">People Count</label>
                <input
                  placeholder="Enter People Count"
                  autoComplete="off"
                  type="number"
                  className=" text-sm w-full px-3 py-2 rounded-[5px] border-[1px] border-gray-300 outline-blue-400 required"
                  value={personsNumber}
                  onChange={(e) => setPersonsNumber(e.target.value)}
                ></input>
              </div>
            </div>

            <label className="text-base font-medium">Table </label>

            <Select
              placeholder="Select Table"
              className="text-sm"
              ref={selectInputRef1}
              defaultValue={selectedOptionTable}
              onChange={setSelectedOptionTable}
              options={filteredTable}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.name}
              isMulti
            />

            <div className="flex flex-row gap-2 items-center justify-end">
              <button
                type="button"
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
              </button>
              <button
                disabled={
                  !customerName ||
                  !personsNumber ||
                  selectedOptionTable.length <= 0
                    ? true
                    : false
                }
                onClick={handleSubmit}
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
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4">
          <span className="flex flex-row items-center gap-10">
            <h1 className="text-2xl font-semibold">Reservations</h1>
            <button
              className="text-base text-gray-500 bg-[#f9f9fa] border-[1px] rounded-lg px-4 py-1 font-medium
          hover:bg-gray-200 transition-all"
              onClick={() => {
                setRefresh(!refresh);
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
                placeholder="Search Customer..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={` bg-gray-100 rounded-s-lg text-base ${
                  search === "" ? "rounded-e-lg" : ""
                } px-4 py-1 outline-none`}
              />
              <button
                type="button"
                className={`${search === "" ? "hidden" : "block"}
              text-gray-400 text-base font-medium bg-gray-100 py-1 px-4 rounded-e-lg cursor-pointer`}
                onClick={() => {
                  setReservationsSearch(reservations);
                  setSearch("");
                }}
              >
                X
              </button>
            </span>

            <button
              onClick={() => {
                handlefilter();
                handleRefresh("Reservations Loaded!", "default");
              }}
              type="submit"
              className="text-base font-semibold bg-greenBtn text-white rounded-lg px-4 py-1 cursor-pointer transition-all  hover:bg-greenBtnHover"
            >
              Search
            </button>
          </form>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-4">
            {reservationsSearch.map((item) => (
              <div
                className="flex flex-col gap-4 border-[1px] rounded-xl p-4"
                key={item.id}
              >
                <div className="flex flex-col gap-1 last:border-none">
                  <p className="text-xs font-medium text-gray-500">
                    {item.date} @ {item.time}
                  </p>
                  <div className="flex felx-row justify-between items-start">
                    <div className="flex flex-col gap-1">
                      <h2 className="text-base font-semibold">{item.name}</h2>
                      <div className="flex flex-row gap-4 text-xs font-medium">
                        <div className="flex flex-row items-center">
                          <IoIosPeople size={15} /> &nbsp; {item.personsNumber}{" "}
                          people
                        </div>
                        <div className="flex flex-row items-center">
                          <TbArmchair2 size={15} /> &nbsp;
                          {item.tableArray
                            .map(
                              (item, index) => "T" + item.name.match(/(\d+)/)[0]
                            )
                            .toSorted()
                            .join(", ")}
                        </div>
                      </div>
                    </div>

                    <RiDeleteBinLine
                      className="text-[red] cursor-pointer"
                      onClick={() =>
                        handleDelete(
                          item.id,
                          "Reservation Canceled successfully",
                          "error"
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Reservations;
