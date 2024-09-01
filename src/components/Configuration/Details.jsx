import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading";
import Error from "../Error";

const Details = ({ user, setUser, loading, handleRefresh }) => {
  const [ordersStatus, setOrdersStatus] = useState("IDLE");

  /*User*/
  const [userName, setUserName] = useState(user?.name);
  const [userStoreName, setUserStoreName] = useState(user?.storeName);
  const [userAddress, setUserAddress] = useState(user?.address);
  const [userPhone, setUserPhone] = useState(user?.phone);
  const [userEmail, setUserEmail] = useState(user?.email);
  const [userCurrency, setUserCurrency] = useState(user?.currency);
  const [userCurrencyCode, setUserCurrencyCode] = useState(user?.currencyCode);
  /*CurrenciesList*/
  const [currencies, setCurrencies] = useState([]);

  const handleEditUser = async (id, e) => {
    e.preventDefault();
    handleRefresh("Data Updated Successfully", "success");
    const updatedUser = {
      id,
      name: userName,
      storeName: userStoreName,
      address: userAddress,
      phone: userPhone,
      email: userEmail,
      currency: userCurrency,
      currencyCode: userCurrencyCode,
    };
    try {
      const response = await axios.put(
        `http://localhost:3600/user/${id}`,
        updatedUser
      );
      setUser(response.data);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    const fetchMenu = async () => {
      setOrdersStatus("LOADING");
      try {
        const UserResponse = await axios.get("http://localhost:3600/user");
        const CurrenciesResponse = await axios.get(
          "http://localhost:3600/currencies"
        );

        setUser(UserResponse.data[0]);
        setCurrencies(CurrenciesResponse.data[0]);
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
    <div className="flex flex-col p-4 flex-[1]">
      <h1 className="text-xl font-semibold mb-5">Store Details</h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col">
          <form
            onSubmit={(e) => handleEditUser(user?.id, e)}
            className="flex flex-col w-full text-gray-500 font-semibold"
          >
            <label className="text-base mb-1">Full Name</label>
            <input
              className="text-sm font-normal bg-[#f9f9fa] w-full px-3 py-2 border-[1px] rounded-md outline-none mb-4 "
              type="text"
              placeholder={userName}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            ></input>
            <label className="text-base mb-1">Store Name</label>
            <input
              className="text-sm font-normal bg-[#f9f9fa] w-full px-3 py-2 border-[1px] rounded-md outline-none mb-4 "
              type="text"
              placeholder={userStoreName}
              value={userStoreName}
              onChange={(e) => setUserStoreName(e.target.value)}
            ></input>
            <label className="text-base mb-1">Address</label>
            <textarea
              className="text-sm font-normal bg-[#f9f9fa] w-full px-3 py-2 rounded-md border-[1px]  outline-none mb-4 required"
              type="text"
              placeholder={userAddress}
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
            ></textarea>
            <label className="text-base mb-1">Email</label>
            <input
              className="text-sm font-normal bg-[#f9f9fa] px-3 py-2 rounded-md border-[1px]  outline-none mb-4"
              type="email"
              placeholder={userEmail}
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            ></input>
            <label className="text-base mb-1">Phone</label>
            <input
              className="text-sm font-normal bg-[#f9f9fa] px-3 py-2 rounded-md border-[1px]  outline-none mb-4"
              type="text"
              placeholder={userPhone}
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
            ></input>

            <label className="text-base mb-1">Currency</label>
            <select
              className="text-sm font-normal bg-[#f9f9fa] border-[1px]  rounded-md p-2 outline-none text-gray-500 cursor-pointer"
              onChange={(e) => {
                setUserCurrency(e.target.value.substring(4));
                setUserCurrencyCode(e.target.value.substring(0, 3));
              }}
              value={userCurrency}
            >
              <option value="" className="border-none">
                --Select Currency--
              </option>
              {Object.keys(currencies).map((currency, index) => (
                <option
                  key={index}
                  value={
                    currencies[currency].code +
                    "," +
                    currencies[currency].symbol
                  }
                  className="border-none"
                >
                  {currency} - {currencies[currency].name} (
                  {currencies[currency].symbol})
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="mt-7 flex justify-center gap-3 bg-greenBtn rounded-md px-3 py-2 text-white text-sm font-semibold  transition-all hover:bg-greenBtnHover"
            >
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Details;
