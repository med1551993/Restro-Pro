import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";

const EditUser = ({
  users,
  userName,
  setUserName,
  userPassword,
  setUserPassword,
  userPhone,
  setUserPhone,
  userEmail,
  setUserEmail,
  userDesignation,
  setUserDesignation,
  userScope,
  setUserScope,
  Scopes,
  handleEdit,
}) => {
  const { id } = useParams();
  const user = users.find((item) => item.id === id);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUserName(user.name);
      setUserPassword(user.password);
      setUserPhone(user.phone);
      setUserEmail(user.email);
      setUserDesignation(user.userDesignation);
      setUserScope(user.userScope.map((item) => item.name));
      console.log(user.userScope.map((item) => item.name));
    }
  }, []);

  return (
    <>
      {/* Overlay Add*/}
      <div className="absolute flex items-center justify-center top-0 left-0 z-99999999 w-full h-full bg-black/50">
        <div className="flex flex-col gap-6 w-[30rem] h-auto bg-white rounded-2xl p-6 shadow-lg ml-3 mr-3">
          <h2 className="text-lg font-extrabold">Adding New User</h2>
          <form
            onSubmit={(e) => e.preventDefault()}
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
                  navigate(-1);
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
                onClick={() => handleEdit(user.id)}
                type="submit"
                className={`font-semibold bg-greenBtn text-white rounded-lg p-2 transition-all 
                           `}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditUser;
