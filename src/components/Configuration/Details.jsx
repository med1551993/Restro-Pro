import React, { useEffect, useState } from "react";
import api from "../../api/user";
import { useParams } from "react-router-dom";
import { STATUS } from "../../utils/status";
import Error from "../Error";
import Loader from "../Loader";

const Details = ({ data, status }) => {
  /*  if (status === STATUS.ERROR) return <Error />;
    if (status === STATUS.LOADING) return <Loader />; */

  const [userName, setUserName] = useState(data.name);
  const [userAddress, setUserAddress] = useState(data.address);
  const [userPhone, setUserPhone] = useState(data.phone);
  const [userEmail, setUserEmail] = useState(data.email);
  const [userCurrency, setUserCurrency] = useState(data.currency);

  return (
    <div className="flex flex-col p-4 flex-[1]">
      <h1 className="text-xl font-semibold mb-5">Store Details</h1>
      <div className="flex flex-col">
        <form className="flex flex-col w-full text-gray-500 font-semibold">
          <label className="text-[1.1rem] mb-1">Full Name</label>
          <input
            className="bg-[#f9f9fa] w-full px-3 py-2 border-2 rounded-md outline-none mb-4 "
            type="text"
            placeholder={userName}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          ></input>

          <label className="text-[1.1rem] mb-1">Address</label>
          <textarea
            className="bg-[#f9f9fa] w-full px-3 py-2 rounded-md border-2 outline-none mb-4 required"
            type="text"
            placeholder={userAddress}
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
          ></textarea>

          <label className="text-[1.1rem] mb-1">Email</label>
          <input
            className="bg-[#f9f9fa] px-3 py-2 rounded-md border-2 outline-none mb-4"
            type="email"
            placeholder={userEmail}
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          ></input>

          <label className="text-[1.1rem] mb-1">Phone</label>
          <input
            className="bg-[#f9f9fa] px-3 py-2 rounded-md border-2 outline-none mb-4"
            type="email"
            placeholder={userPhone}
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
          ></input>

          <label className="text-[1.1rem] mb-1">Currency</label>
          <select
            className="bg-[#f9f9fa] border-2 rounded-md p-2 outline-none text-gray-500 cursor-pointer"
            onChange={(e) => setUserCurrency(e.target.value)}
          >
            <option className="border-none">{userCurrency}</option>
            <option className="border-none">European Union euro - (EU)</option>
          </select>

          <button
            type="submit"
            className="mt-7 flex justify-center gap-3 bg-greenBtn rounded-md px-3 py-2 text-white font-bold  transition-all hover:bg-greenBtnHover"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Details;
