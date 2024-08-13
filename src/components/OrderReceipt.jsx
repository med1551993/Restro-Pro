import React, { useRef, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactPrint from "react-to-print";
import axios from "axios";
import Loading from "./Loading";
import Error from "./Error";

const OrderReceipt = ({ kitchen, getDate }) => {
  const [ordersStatus, setOrdersStatus] = useState("IDLE");
  const ref = useRef();
  const { id } = useParams();
  const navigate = useNavigate();
  const order = kitchen.find((item) => item.id === id);
  const [user, setUser] = useState([]);
  const [printSettings, setPrintSettings] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      setOrdersStatus("LOADING");
      try {
        const UserResponse = await axios.get("http://localhost:3600/user");
        const pritSettingResponse = await axios.get(
          "http://localhost:3600/printSettings"
        );
        setUser(UserResponse.data[0]);
        setPrintSettings(pritSettingResponse.data[0]);
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

  if (ordersStatus == "ERROR") return <Error />;
  if (ordersStatus == "LOADING") return <Loading />;

  return (
    <div
      className="absolute flex flex-col gap-2
        items-center justify-center top-0 left-0 z-50 w-full h-full bg-black/50"
    >
      <div className="w-96 rounded bg-gray-50 px-6 pt-8 shadow-lg" ref={ref}>
        {printSettings.storeDetails == true ? (
          <div className="flex flex-col justify-center items-center gap-2  border-b border-dashed py-2">
            <h4 className="font-semibold uppercase">{user.name}</h4>
            <p className="text-xs uppercase">{user.address}</p>
            <p className="text-xs uppercase">
              Phone:{user.phone}, Email: {user.email}
            </p>
          </div>
        ) : null}

        <p className="text-xs uppercase text-center border-b border-dashed py-2">
          {printSettings.header}
        </p>
        <div className="flex flex-col gap-3 border-b border-dashed py-6 text-xs">
          <p className="flex justify-between">
            <span className="text-gray-400">Receipt No.:</span>
            <span>#{order.id}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-400">Order Type:</span>
            <span>{order.diningOption}</span>
          </p>

          {printSettings.customerDetails == true ? (
            <p className="flex justify-between">
              <span className="text-gray-400">Customer:</span>
              <span>{order.customer}</span>
            </p>
          ) : null}

          <p className="flex justify-between">
            <span className="text-gray-400">Date:</span>
            <span>{getDate()}</span>
          </p>
        </div>
        <div className="flex flex-col gap-3 pb-6 pt-2 text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="flex">
                <th className="w-full py-2">Product</th>
                <th className="min-w-[44px] py-2">QTY</th>
                <th className="min-w-[44px] py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.data.map((item) => (
                <tr key={item.id} className="flex">
                  <td className="flex-1 py-1">{item.name}</td>
                  <td className="min-w-[44px]">{item.qty}</td>
                  <td className="min-w-[44px]">${item.price * item.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className=" border-b border-dashed"></div>
          <div className="flex flex-row items-center justify-end p-2 font-bold text-lg">
            <div className="flex flex-col">
              <div className="font-medium text-xs">
                <span className="min-w-[44px] ">Total Tax</span>
                <span>
                  {" "}
                  $
                  {order.data.reduce((cartTax, cartItem) => {
                    return (cartTax =
                      cartTax +
                      ((cartItem.price * cartItem.tax) / 100) * cartItem.qty);
                  }, 0)}
                </span>
              </div>
              <div className="font-bold text-lg">
                <span className="min-w-[44px] ">Total </span>
                <span>
                  $
                  {order.data.reduce((cartTotal, cartItem) => {
                    return (cartTotal =
                      cartTotal + cartItem.price * cartItem.qty);
                  }, 0) +
                    order.data.reduce((cartTax, cartItem) => {
                      return (cartTax =
                        cartTax +
                        ((cartItem.price * cartItem.tax) / 100) * cartItem.qty);
                    }, 0)}
                </span>
              </div>
            </div>
          </div>

          <div className="py-4 flex flex-col justify-center items-center gap-2  ">
            <p className=" border-b border-dashed w-full text-center uppercase">
              {printSettings.footer}
            </p>
            <p className="text-center py-4 ">
              for all your complaints call: <br /> 548976548
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-2 items-center justify-end w-96">
        <button
          className="text-gray-500 font-semibold flex items-center gap-1 bg-gray-200 rounded-lg p-2 cursor-pointer transition-all hover:bg-gray-300"
          onClick={() => navigate(-1)}
        >
          Close
        </button>
        <ReactPrint
          trigger={() => (
            <button className="font-semibold bg-greenBtn text-white rounded-lg p-2 cursor-pointer transition-all  hover:bg-greenBtnHover">
              Print
            </button>
          )}
          content={() => ref.current}
          documentTitle={"receipt"}
        />
      </div>
    </div>
  );
};

export default OrderReceipt;
