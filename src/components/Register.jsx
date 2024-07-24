import { React, useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/user";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PHONE_REGEX = /^\+\d{1,3}\d{9}$/;

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  const [address, setAddress] = useState("");

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPhone(PHONE_REGEX.test(phone));
  }, [phone]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await api.post("/users", {
        user,
        pwd,
        phone,
        email,
        address,
        menu:[],
        customers:[]
      });
      navigate("/login");
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser("");
      setPwd("");
      setMatchPwd("");
      setEmail("");
      setPhone("");
      setAddress("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
    }
  };

  return (
    <section className="global_container py-14 flex flex-col">
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
          <FontAwesomeIcon
            icon={faCheck}
            className={validName ? "text-greenBtn ml-2" : "hidden"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validName || !user ? "hidden" : "text-[red] ml-2"}
          />
        </label>
        <input
          id="username"
          className="bg-[#f2f2f2] w-full px-3 py-2 rounded-md border-none outline-none mb-4 required"
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
          type="text"
          placeholder="E.g: Foulen Fouleni"
        ></input>
        <p className={userFocus && user && !validName ? "" : "hidden"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          &nbsp;4 to 24 characters.
          <br />
          Must begin with a letter.
          <br />
          Letters, numbers, underscores, hyphens allowed.
        </p>

        <label htmlFor="password" className="text-[1.1rem] font-medium mb-1">
          Password
          <FontAwesomeIcon
            icon={faCheck}
            className={validPwd ? "text-greenBtn ml-2" : "hidden"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validPwd || !pwd ? "hidden" : "text-[red] ml-2"}
          />
        </label>
        <input
          id="password"
          className="bg-[#f2f2f2] w-full px-3 py-2 rounded-md border-none outline-none mb-4 required"
          autoComplete="off"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
          type="password"
          placeholder="............."
        ></input>
        <p id="pwdnote" className={pwdFocus && !validPwd ? "" : "hidden"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          &nbsp;8 to 24 characters.
          <br />
          Must include uppercase and lowercase letters, a number and a special
          character.
          <br />
          Allowed special characters:{" "}
          <span aria-label="exclamation mark">!</span>{" "}
          <span aria-label="at symbol">@</span>{" "}
          <span aria-label="hashtag">#</span>{" "}
          <span aria-label="dollar sign">$</span>{" "}
          <span aria-label="percent">%</span>
        </p>

        <label htmlFor="confirm_pwd" className="text-[1.1rem] font-medium mb-1">
          Confirm Password
          <FontAwesomeIcon
            icon={faCheck}
            className={validMatch && matchPwd ? "text-greenBtn ml-2" : "hidden"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validMatch || !matchPwd ? "hidden" : "text-[red] ml-2"}
          />
        </label>
        <input
          id="confirm_pwd"
          className="bg-[#f2f2f2] w-full px-3 py-2 rounded-md border-none outline-none mb-4 required"
          autoComplete="off"
          onChange={(e) => setMatchPwd(e.target.value)}
          value={matchPwd}
          required
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
          type="password"
          placeholder="............."
        ></input>
        <p
          id="confirmnote"
          className={matchFocus && !validMatch ? "" : "hidden"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          &nbsp;Must match the first password input field.
        </p>

        <label className="text-[1.1rem] font-medium mb-1">
          Email
          <FontAwesomeIcon
            icon={faCheck}
            className={validEmail ? "text-greenBtn ml-2" : "hidden"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validEmail || !email ? "hidden" : "text-[red] ml-2"}
          />
        </label>
        <input
          className="bg-[#f2f2f2] px-3 py-2 rounded-md border-none outline-none mb-4"
          type="email"
          autoComplete="off"
          placeholder="foulenmail@example.com"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        ></input>
        <p
          id="confirmnote"
          className={emailFocus && email && !validEmail ? "" : "hidden"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          &nbsp;this is not a valid email address.
        </p>

        <label className="text-[1.1rem] font-medium mb-1">
          Phone
          <FontAwesomeIcon
            icon={faCheck}
            className={validPhone ? "text-greenBtn ml-2" : "hidden"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validPhone || !phone ? "hidden" : "text-[red] ml-2"}
          />
        </label>
        <input
          className="bg-[#f2f2f2] px-3 py-2 rounded-md border-none outline-none mb-4"
          type="text"
          placeholder="123456789"
          autoComplete="off"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onFocus={() => setPhoneFocus(true)}
          onBlur={() => setPhoneFocus(false)}
        ></input>
        <p
          id="confirmnote"
          className={phoneFocus && phone && !validPhone ? "" : "hidden"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          &nbsp;The phone number is invalid.
        </p>

        <label className="text-[1.1rem] font-medium mb-1">Address</label>
        <input
          className="bg-[#f2f2f2] px-3 py-2 rounded-md border-none outline-none mb-4"
          type="text"
          placeholder="street"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></input>

        <button
          type="submit"
          disabled={!validName || !validPwd || !validMatch || !validPhone ? true : false}
          className={`flex justify-center gap-3 bg-greenBtn rounded-md px-3 py-2 mt-3 text-white font-bold transition-all 
            ${!validName || !validPwd || !validMatch || !validPhone ? "opacity-40" : "hover:bg-greenBtnHover"}`}
        >
          Register
        </button>

        <span className="mt-5">
          Already registred?
          <Link to="/login" className="ml-2 underline">
            Sign In
          </Link>
        </span>
      </form>
    </section>
  );
};

export default Register;
