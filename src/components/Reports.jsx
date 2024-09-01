import React, { useEffect, useState } from "react";
import { TbToolsKitchen2 } from "react-icons/tb";
import { BiFilterAlt } from "react-icons/bi";
import { format } from "date-fns";
import Loading from "./Loading";

const Reports = ({ orders, customers, user }) => {
  /* Today */
  const Today = format(new Date(), "yyyy-MM-dd");
  /* Yesterday */
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const Yesterday = yesterday.toISOString().split("T")[0];
  /* Last_7_Days */
  let last_7_days = new Date();
  last_7_days.setDate(last_7_days.getDate() - 7);
  const Last_7_Days = last_7_days.toISOString().split("T")[0];

  const [loading, setLoading] = useState(false);
  const [filterOverlay, setFilterOverlay] = useState(false);
  const [dateFrom, setDateFrom] = useState(Today);
  const [filter, setFilter] = useState(Today);
  const [showing, setShowing] = useState("Today");
  const [dateTo, setDateTo] = useState(Today);
  const [sellingItems, setSellingItems] = useState([]);
  const [action, setAction] = useState(true);

  const [averageOrderValue, setAverageOrderValue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [newCustomers, setNewCustomers] = useState(0);

  const handleTotalOrders = (array) => {
    const total = array.length;
    setTotalOrders(total);
  };

  const topSellingItems = () => {
    let tempItems = [];

    orders
      .filter((order) => order.paid == true)
      .map((order) =>
        order.data.map((item) =>
          tempItems.push({
            name: item.name,
            price: item.price,
            qty: item.qty,
            date: order.date2,
          })
        )
      );
    if (filter == "Custom Date Range") {
      const filteredItems = tempItems.filter(
        (item) => item.date >= dateFrom && item.date <= dateTo
      );

      /*regrouper les élément selon le nom */
      for (let i = 0; i < filteredItems.length - 1; i++) {
        for (let j = i + 1; j < filteredItems.length; j++) {
          if (filteredItems[j].name == filteredItems[i].name) {
            filteredItems[i].qty = filteredItems[i].qty + filteredItems[j].qty;
            filteredItems.splice(j, 1);
          }
        }
      }
      /*Sort the table */
      for (let i = 0; i < filteredItems.length - 1; i++) {
        for (let j = i + 1; j < filteredItems.length; j++) {
          if (filteredItems[j].qty > filteredItems[i].qty) {
            let c = filteredItems[i];
            filteredItems[i] = filteredItems[j];
            filteredItems[j] = c;
          }
        }
      }

      return setSellingItems(filteredItems);
    } else if (filter == Last_7_Days) {
      const filteredItems = tempItems.filter((item) => item.date >= filter);

      /*regrouper les éléments selon le nom */
      for (let i = 0; i < filteredItems.length - 1; i++) {
        for (let j = i + 1; j < filteredItems.length; j++) {
          if (filteredItems[j].name == filteredItems[i].name) {
            filteredItems[i].qty = filteredItems[i].qty + filteredItems[j].qty;
            filteredItems.splice(j, 1);
          }
        }
      }
      /*Sort the table */
      for (let i = 0; i < filteredItems.length - 1; i++) {
        for (let j = i + 1; j < filteredItems.length; j++) {
          if (filteredItems[j].qty > filteredItems[i].qty) {
            let c = filteredItems[i];
            filteredItems[i] = filteredItems[j];
            filteredItems[j] = c;
          }
        }
      }

      return setSellingItems(filteredItems);
    } else if (filter == Yesterday) {
      const filteredItems = tempItems.filter(
        (item) => item.date >= filter && item.date <= filter
      );

      /*regrouper les éléments selon le nom */
      for (let i = 0; i < filteredItems.length - 1; i++) {
        for (let j = i + 1; j < filteredItems.length; j++) {
          if (filteredItems[j].name == filteredItems[i].name) {
            filteredItems[i].qty = filteredItems[i].qty + filteredItems[j].qty;
            filteredItems.splice(j, 1);
          }
        }
      }
      /*Sort the table */
      for (let i = 0; i < filteredItems.length - 1; i++) {
        for (let j = i + 1; j < filteredItems.length; j++) {
          if (filteredItems[j].qty > filteredItems[i].qty) {
            let c = filteredItems[i];
            filteredItems[i] = filteredItems[j];
            filteredItems[j] = c;
          }
        }
      }

      return setSellingItems(filteredItems);
    } else if (filter == Today) {
      const filteredItems = tempItems.filter(
        (item) => item.date >= filter && item.date <= filter
      );

      /*regrouper les éléments selon le nom */
      for (let i = 0; i < filteredItems.length - 1; i++) {
        for (let j = i + 1; j < filteredItems.length; j++) {
          if (filteredItems[j].name == filteredItems[i].name) {
            filteredItems[i].qty = filteredItems[i].qty + filteredItems[j].qty;
            filteredItems.splice(j, 1);
          }
        }
      }
      /*Sort the table */
      for (let i = 0; i < filteredItems.length - 1; i++) {
        for (let j = i + 1; j < filteredItems.length; j++) {
          if (filteredItems[j].qty > filteredItems[i].qty) {
            let c = filteredItems[i];
            filteredItems[i] = filteredItems[j];
            filteredItems[j] = c;
          }
        }
      }

      return setSellingItems(filteredItems);
    }
  };

  const handleTotalSales = () => {
    let tempItems = [];

    orders
      .filter((order) => order.paid == true)
      .map((order) =>
        order.data.map((item) =>
          tempItems.push({
            name: item.name,
            price: item.price,
            qty: item.qty,
            date: order.date2,
          })
        )
      );
    if (filter == "Custom Date Range") {
      const filteredItems = tempItems.filter(
        (item) => item.date >= dateFrom && item.date <= dateTo
      );
      const Average = filteredItems.reduce((totalAverage, item) => {
        return (totalAverage = totalAverage + item.price * item.qty);
      }, 0);

      return setTotalSales(Average);
    } else if (filter == Last_7_Days) {
      const filteredItems = tempItems.filter((item) => item.date >= filter);
      const Average = filteredItems.reduce((totalAverage, item) => {
        return (totalAverage = totalAverage + item.price * item.qty);
      }, 0);

      return setTotalSales(Average);
    } else if (filter == Yesterday) {
      const filteredItems = tempItems.filter(
        (item) => item.date >= filter && item.date <= filter
      );
      const Average = filteredItems.reduce((totalAverage, item) => {
        return (totalAverage = totalAverage + item.price * item.qty);
      }, 0);

      return setTotalSales(Average);
    } else if (filter == Today) {
      const filteredItems = tempItems.filter((item) => item.date >= filter);
      const Average = filteredItems.reduce((totalAverage, item) => {
        return (totalAverage = totalAverage + item.price * item.qty);
      }, 0);

      return setTotalSales(Average);
    }
  };

  const handelTotalOrders = () => {
    let tempItems = [];

    orders
      .filter((order) => order.paid == false)
      .map((order) =>
        order.data.map((item) =>
          tempItems.push({
            name: item.name,
            price: item.price,
            qty: item.qty,
            date: order.date2,
          })
        )
      );
    if (filter == "Custom Date Range") {
      const filteredItems = tempItems.filter(
        (item) => item.date >= dateFrom && item.date <= dateTo
      );

      handleTotalOrders(filteredItems);
      handleAverageOrderValue(filteredItems);
    } else if (filter == Today) {
      const filteredItems = tempItems.filter((item) => item.date >= filter);

      handleTotalOrders(filteredItems);
      handleAverageOrderValue(filteredItems);
    } else if (filter == Last_7_Days) {
      const filteredItems = tempItems.filter((item) => item.date >= filter);

      handleTotalOrders(filteredItems);
      handleAverageOrderValue(filteredItems);
    } else if (filter == Yesterday) {
      const filteredItems = tempItems.filter(
        (item) => item.date >= filter && item.date <= filter
      );
      handleTotalOrders(filteredItems);
      handleAverageOrderValue(filteredItems);
    }
  };

  const handleCustomers = () => {
    if (filter == "Custom Date Range") {
      const filteredTotalCustomers = customers.filter(
        (item) =>
          item.datetime.slice(0, 10).split("/").reverse().join("-") <= dateFrom
      );
      const filteredNewCustomers = customers.filter(
        (item) =>
          item.datetime.slice(0, 10).split("/").reverse().join("-") >=
            dateFrom &&
          item.datetime.slice(0, 10).split("/").reverse().join("-") <= dateFrom
      );
      setTotalCustomers(filteredTotalCustomers.length);
      setNewCustomers(filteredNewCustomers.length);
    } else if (filter == Today) {
      const filteredTotalCustomers = customers.filter(
        (item) =>
          item.datetime.slice(0, 10).split("/").reverse().join("-") <= filter
      );
      const filteredNewCustomers = customers.filter(
        (item) =>
          item.datetime.slice(0, 10).split("/").reverse().join("-") >= filter
      );
      setTotalCustomers(filteredTotalCustomers.length);
      setNewCustomers(filteredNewCustomers.length);
    } else if (filter == Yesterday) {
      const filteredTotalCustomers = customers.filter(
        (item) =>
          item.datetime.slice(0, 10).split("/").reverse().join("-") <= filter
      );
      const filteredNewCustomers = customers.filter(
        (item) =>
          item.datetime.slice(0, 10).split("/").reverse().join("-") >= filter &&
          item.datetime.slice(0, 10).split("/").reverse().join("-") <= filter
      );
      setTotalCustomers(filteredTotalCustomers.length);
      setNewCustomers(filteredNewCustomers.length);
    } else if (filter == Last_7_Days) {
      const filteredTotalCustomers = customers.filter(
        (item) =>
          item.datetime.slice(0, 10).split("/").reverse().join("-") <= filter
      );
      const filteredNewCustomers = customers.filter(
        (item) =>
          item.datetime.slice(0, 10).split("/").reverse().join("-") >= filter
      );
      setTotalCustomers(filteredTotalCustomers.length);
      setNewCustomers(filteredNewCustomers.length);
    }
  };
  const handleShowing = () => {
    switch (filter) {
      case Today:
        setShowing("Today");
        break;
      case "Custom Date Range":
        setShowing("Custom Date Range");
        break;
      case Yesterday:
        setShowing("Yesterday");
        break;
      case Last_7_Days:
        setShowing("Last 7 Days ");
        break;
    }
  };

  const handleAverageOrderValue = (sellingItems) => {
    const Average = sellingItems.reduce((totalAverage, item) => {
      return (totalAverage = totalAverage + item.price * item.qty);
    }, 0);
    setAverageOrderValue(Average);
  };

  useEffect(() => {
    topSellingItems();
    handleShowing();
    handleTotalSales();
    handelTotalOrders();
    handleCustomers();
  }, [action]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      {/* filter Overlay */}
      <div
        className={`absolute ${filterOverlay ? "flex" : "hidden"} 
        items-center justify-center top-0 left-0 z-99999999 w-full h-full bg-black/50`}
      >
        <div className="flex flex-col gap-6 w-[30rem] h-auto bg-white rounded-2xl p-6 shadow-lg ml-3 mr-3">
          <h2 className="flex flex-row items-center gap-2 text-lg font-extrabold">
            <BiFilterAlt /> Filter
          </h2>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-4"
          >
            <label className="text-base font-medium -mb-3">Filter</label>
            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setDateTo("");
              }}
              className=" text-sm w-full px-3 py-2 rounded-[5px] border-[1px] border-gray-300 outline-blue-400 mb-4 required cursor-pointer"
            >
              <option value={Today} className="border-none">
                Today
              </option>
              <option value={Yesterday}>Yesterday</option>
              <option value={Last_7_Days}>Last 7 Days </option>
              <option value="Custom Date Range">Custom Date Range </option>
            </select>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-base font-medium">From</label>
                <input
                  className=" text-sm w-full px-3 py-2 rounded-[5px] border-[1px] border-gray-300 outline-blue-400 mb-4 required"
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                ></input>
              </div>

              <div>
                <label className="text-base font-medium">To</label>
                <input
                  className=" text-sm w-full px-3 py-2 rounded-[5px] border-[1px] border-gray-300 outline-blue-400 mb-4 required"
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="flex flex-row gap-2 items-center justify-end">
              <button
                type="button"
                onClick={() => setFilterOverlay(false)}
                className="text-gray-500 font-semibold flex items-center gap-1 bg-gray-200 rounded-lg p-2 cursor-pointer transition-all hover:bg-gray-300"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setFilterOverlay(false);
                  setAction(!action);
                  handleRefresh();
                }}
                type="submit"
                className="font-semibold bg-greenBtn text-white rounded-lg p-2 transition-all hover:bg-greenBtnHover "
              >
                Apply
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex flex-col p-4 ">
        <div className=" flex flex-row items-center justify-between mb-6">
          <h1 className="text-2xl font-normal">Reports</h1>
          <button
            onClick={() => setFilterOverlay(true)}
            className="flex flex-row items-center gap-2 bg-gray-100 hover:bg-gray-200 text-lg font-semibold rounded-full px-4 py-1 cursor-pointer transition-all"
          >
            <BiFilterAlt /> Filter
          </button>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-col gap-8">
            <p className="mb-4">Showing Data for {showing}</p>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 2xl:grid-cols-3">
              {/* Top_Selling_Items */}
              <div className="flex flex-col lg:col-span-2 2xl:col-span-1 border-[1px] rounded-2xl gap-5 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold">Top Selling Items</h2>
                </div>

                {sellingItems.length == 0
                  ? "no items"
                  : sellingItems.map((item, index) => (
                      <div
                        className="flex flex-row justify-between items-center"
                        key={index}
                      >
                        <div className="flex gap-4">
                          <span className="flex justify-center items-center bg-gray-100 text-gray-500 p-3 rounded-xl">
                            <TbToolsKitchen2 size={20} />
                          </span>
                          <div className="flex flex-col gap-1">
                            <h2 className="text-sm font-semibold">
                              {item.name}
                            </h2>
                            <div className="flex flex-row gap-4">
                              <p className="text-xs font-medium text-gray-500">
                                {user.currency}
                                {item.price}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <span className="text-lg font-bold">{item.qty}</span>
                        </div>
                      </div>
                    ))}
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 2xl:grid-cols-3">
              {/*  Total Sales */}
              <div className="flex flex-col border-[1px] rounded-2xl gap-5 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold">Total Sales</h2>
                </div>
                <div>
                  <span className="text-3xl font-bold">
                    {" "}
                    {user.currency}
                    {totalSales}
                  </span>
                </div>
              </div>

              {/*  Average Order Value */}
              <div className="flex flex-col border-[1px] rounded-2xl gap-5 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold">Average Order Value</h2>
                </div>
                <div>
                  <span className="text-3xl font-bold">
                    {user.currency}
                    {averageOrderValue}
                  </span>
                </div>
              </div>

              {/*  Total Orders */}
              <div className="flex flex-col border-[1px] rounded-2xl gap-5 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold">Total Orders</h2>
                </div>
                <div>
                  <span className="text-3xl font-bold">{totalOrders}</span>
                </div>
              </div>

              {/*  Total Customers */}
              <div className="flex flex-col border-[1px] rounded-2xl gap-5 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold">Total Customers</h2>
                </div>
                <div>
                  <span className="text-3xl font-bold">{totalCustomers}</span>
                </div>
              </div>

              {/*  New Customers */}
              <div className="flex flex-col border-[1px] rounded-2xl gap-5 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold">New Customers</h2>
                </div>
                <div>
                  <span className="text-3xl font-bold">{newCustomers}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Reports;
