import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidShow } from "react-icons/bi";
import api from "../api/user";

const LogIn = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showPwd, setShowPwd] = useState("password");
  console.log("ShowPwd", showPwd);

  const handleShowPwd = () => {
    if (showPwd === "password") {
      setShowPwd("text");
    } else {
      setShowPwd("password");
    }
    return;
  };
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get("/users");
      console.log(response);
      response.data.map((item) => {
        if (item.user === user) {
          if (item.pwd === pwd) {
            setErrMsg("");
            setUser("");
            setPwd("");
            navigate("/dashboard");
            return;
          } else {
            setErrMsg("Wrong User!");
          }
        }
        setErrMsg("Wrong User!");
      });
      setUser("");
      setPwd("");
    } catch (err) {
      console.log(err?.response);
    }
  };

  return (
    <>
      <section className="global_container py-24 flex flex-col">
        <p
          className={`${
            errMsg.length !== 0
              ? "text-[#721c24] bg-[#f8d7da] text-xl font-bold p-3 rounded-md mb-3"
              : "hidden"
          }`}
        >
          {errMsg}
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <label htmlFor="username" className="text-[1.1rem] font-medium mb-1">
            Username
          </label>
          <input
            id="username"
            className="bg-[#f2f2f2] w-full px-3 py-2 rounded-md border-none outline-none mb-4 required"
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            type="text"
          ></input>

          <label htmlFor="password" className="text-[1.1rem] font-medium mb-1">
            Password
          </label>
          <span className="flex flex-row w-full">
            <input
              id="password"
              className="bg-[#f2f2f2] w-full px-3 py-2 rounded-s-md border-none outline-none mb-4 required"
              autoComplete="off"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              type={showPwd}
            ></input>
            {pwd.length > 0 ? (
              <span onClick={() => handleShowPwd()}>
                <BiSolidShow
                  size={40}
                  className="bg-[#f2f2f2] rounded-e-md px-3 py-2 text-gray-500 cursor-pointer"
                />
              </span>
            ) : null}
          </span>

          <button
            type="submit"
            className="flex justify-center gap-3 bg-greenBtn rounded-md px-3 py-2 mt-3 text-white font-bold  transition-all hover:bg-greenBtnHover"
          >
            Sign In
          </button>

          <span className="mt-5">
            Need an Account?
            <Link to="/register" className="ml-2 underline">
              Sign Up
            </Link>
          </span>
        </form>
      </section>
    </>
  );
};

export default LogIn;
