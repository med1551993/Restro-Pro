import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./context/AuthProvider";
import axios from "../api/user";

const LogIn = () => {
  const { setAuth } = useContext(AuthContext);

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/users", { user, pwd });
      setUser("");
      setPwd("");
    } catch (err) {}
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
          <input
            id="password"
            className="bg-[#f2f2f2] w-full px-3 py-2 rounded-md border-none outline-none mb-4 required"
            autoComplete="off"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            type="password"
          ></input>

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
