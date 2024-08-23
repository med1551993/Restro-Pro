import React, { useRef, useEffect, useState } from "react";
import Loading from "./Loading";
import Error from "./Error";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { BsTelephone } from "react-icons/bs";
import { Link, Route, Routes } from "react-router-dom";
import photo_profile from "../images/photo_profile.png";
import { CiMail } from "react-icons/ci";
import Select from "react-select";
import EditUser from "./EditUser";
import { useNavigate } from "react-router-dom";

const Scopes = [
  { name: "DASHBOARD" },
  { name: "POS" },
  { name: "ORDERS" },
  { name: "KITCHEN" },
];

const Users = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [ordersStatus, setOrdersStatus] = useState("IDLE");

  const [userOverlay, setUserOverlay] = useState(false);

  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userDesignation, setUserDesignation] = useState("");
  const [userScope, setUserScope] = useState([]);

  const [refresh, setRefresh] = useState(false);

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

  const handleDelete = async (id, message, type) => {
    try {
      await axios.delete(`http://localhost:3600/user/${id}`);
      const allUsers = users.filter((item) => item.id !== id);
      setUsers(allUsers);
      handleRefresh(message, type);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleRefresh("Users Added Successfully!", "success");

    const newUser = {
      name: userName,
      password: userPassword,
      phone: userPhone,
      email: userEmail,
      userDesignation: userDesignation,
      userScope: userScope,
      type: "notAdmin",
    };
    try {
      const response = await axios.post("http://localhost:3600/user", newUser);
      const allUsers = [...users, response.data];
      setUsers(allUsers);

      setUserName("");
      setUserPassword("");
      setUserPhone("");
      setUserEmail("");
      setUserDesignation("");
      setUserScope([]);

      setUserOverlay(false);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleEdit = async (id) => {
    const updatedUser = {
      id,
      name: userName,
      password: userPassword,
      phone: userPhone,
      email: userEmail,
      userDesignation: userDesignation,
      userScope: userScope,
      type: "notAdmin",
    };
    handleRefresh("User Updated Successfully!", "success");
    try {
      const response = await axios.put(
        `http://localhost:3600/user/${id}`,
        updatedUser
      );
      setUsers(
        users.map((item) => (item.id === id ? { ...response.data } : item))
      );
      navigate(-1);
      setUserName("");
      setUserPassword("");
      setUserPhone("");
      setUserEmail("");
      setUserDesignation("");
      setUserScope([]);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setOrdersStatus("LOADING");
      try {
        const Response = await axios.get("http://localhost:3600/user");

        setUsers(Response.data);

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

    fetchUsers();
  }, [refresh]);

  if (ordersStatus == "ERROR") return <Error />;
  if (ordersStatus == "LOADING") return <Loading />;

  return (
    <>
      {/* Overlay Add*/}
      <div
        className={`absolute ${
          userOverlay ? "flex" : "hidden"
        } items-center justify-center top-0 left-0 z-99999999 w-full h-full bg-black/50`}
      >
        <div className="flex flex-col gap-6 w-[30rem] h-auto bg-white rounded-2xl p-6 shadow-lg ml-3 mr-3">
          <h2 className="text-lg font-extrabold">Adding New User</h2>
          <form
            onSubmit={handleSubmit}
            className="relative flex flex-col gap-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-base font-medium">Name</label>
                <input
                  placeholder="Enter Name here"
                  autoComplete="off"
                  type="text"
                  className=" text-sm w-full px-3 py-2 rounded-[5px] border-[1px] border-gray-300 outline-blue-400 required"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                ></input>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-base font-medium">Designation</label>
                <input
                  placeholder="Enter Designation here"
                  autoComplete="off"
                  type="text"
                  className=" text-sm w-full px-3 py-2 rounded-[5px] border-[1px] border-gray-300 outline-blue-400 required"
                  value={userDesignation}
                  onChange={(e) => setUserDesignation(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-base font-medium">Password</label>
              <input
                placeholder="Enter Password here"
                autoComplete="off"
                type="password"
                className=" text-sm w-full px-3 py-2 rounded-[5px] border-[1px] border-gray-300 outline-blue-400 required"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              ></input>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-base font-medium">Phone</label>
                <input
                  placeholder="Enter Phone here"
                  autoComplete="off"
                  type="text"
                  className=" text-sm w-full px-3 py-2 rounded-[5px] border-[1px] border-gray-300 outline-blue-400 required"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                ></input>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-base font-medium">Email</label>
                <input
                  placeholder="Enter Email here"
                  autoComplete="off"
                  type="text"
                  className=" text-sm w-full px-3 py-2 rounded-[5px] border-[1px] border-gray-300 outline-blue-400 required"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-base font-medium">Scope</label>
              <Select
                placeholder="Select Scopes"
                className="text-sm"
                defaultValue={userScope}
                onChange={setUserScope}
                options={Scopes}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.name}
                isMulti
              />
            </div>

            <div className="flex flex-row gap-2 items-center justify-end">
              <button
                type="button"
                className="text-gray-500 font-semibold flex items-center gap-1 bg-gray-200 rounded-lg p-2 cursor-pointer transition-all hover:bg-gray-300"
                onClick={() => {
                  setUserOverlay(false);
                  setUserName("");
                  setUserPassword("");
                  setUserPhone("");
                  setUserPhone("");
                  setUserEmail("");
                  setUserDesignation("");
                  setUserScope([]);
                }}
              >
                Close
              </button>
              <button
                onClick={handleSubmit}
                type="submit"
                className={`font-semibold bg-greenBtn text-white rounded-lg p-2 transition-all 
                           `}
              >
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-row items-center p-4 gap-10">
          <h1 className="text-2xl font-semibold">Users</h1>
          <button
            className="text-base text-gray-500 bg-[#f9f9fa] border-[1px] rounded-lg px-4 py-1 font-medium
          hover:bg-gray-200 transition-all"
            onClick={() => {
              setRefresh(!refresh);
              setUserOverlay(true);
            }}
          >
            {" "}
            <big>+</big> New
          </button>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-4">
            {users.map((item) => (
              <div
                className=" flex flex-col items-center justify-between first:justify-normal p-4 gap-2 border-[1px] rounded-xl"
                key={item.id}
              >
                <img
                  src={photo_profile}
                  alt="userPhoto"
                  className="w-[4rem] rounded-full border"
                />
                <h1 className="text-lg">{item.name}</h1>
                <p className="text-gray-400 text-xs">{item.type}</p>
                <span className="bg-greenBtn px-2 py-1 rounded-full text-white text-sm">
                  {item.userDesignation}
                </span>

                {item.type != "Admin" && (
                  <>
                    <span className="flex flex-row items-center gap-2 self-start text-sm">
                      <BsTelephone size={12} /> {item.phone}
                    </span>
                    <span className="flex flex-row items-center gap-2 self-start text-sm">
                      <CiMail size={15} /> {item.email}
                    </span>
                    <p className=" self-start text-sm">Scopes:</p>
                    <div className="self-start flex flex-row flex-wrap gap-2 *:text-xs *:rounded-full *:uppercase *:py-1 *:px-2 *:bg-gray-100 *:text-gray-400">
                      {item.userScope?.map((item, index) => (
                        <span key={index}>{item.name}</span>
                      ))}
                    </div>
                    <div className=" grid grid-cols-2 justify-between gap-3 w-full mt-3">
                      <Link
                        to={`./user/${item.id}`}
                        className="flex items-center justify-center text-center px-3 py-1 text-gray-500 font-semibold text-xs bg-gray-100 rounded-lg transition-all hover:bg-gray-200"
                      >
                        Edit User
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(
                            item.id,
                            "User Deleted Successfully",
                            "error"
                          )
                        }
                        className="px-3 py-1 text-[red] font-semibold text-xs bg-gray-100 rounded-lg transition-all hover:bg-[red] hover:text-white"
                      >
                        {" "}
                        Delete User
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Routes>
        <Route
          path="/user/:id"
          element={
            <EditUser
              users={users}
              userName={userName}
              setUserName={setUserName}
              userPassword={userPassword}
              setUserPassword={setUserPassword}
              userPhone={userPhone}
              setUserPhone={setUserPhone}
              userEmail={userEmail}
              setUserEmail={setUserEmail}
              userDesignation={userDesignation}
              setUserDesignation={setUserDesignation}
              userScope={userScope}
              setUserScope={setUserScope}
              Scopes={Scopes}
              handleEdit={handleEdit}
            />
          }
        />
      </Routes>
    </>
  );
};

export default Users;
