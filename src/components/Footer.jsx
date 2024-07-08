import React from "react";
import { Link } from "react-router-dom";
import facebook from "../images/social/facebook.png";
import instagram from "../images/social/instagram.png";
import youtube from "../images/social/youtube.png";
import twitter from "../images/social/twitter.png";
import { TbPhoneCall } from "react-icons/tb";
import { TbMail } from "react-icons/tb";
import { MdOutlineLocationOn } from "react-icons/md";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <>
      <section className="w-full bg-darkGreen text-white">
        <div className="global_container py-14">
          <div className="grid justify-center text-center md:grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="flex justify-center items-start md:justify-start lg:items-start lg:justify-start">
              <Link
                to="/features"
                className="flex flex-col items-end text-center font-black mb-8 md:mb-0"
                onClick={scrollToTop}
              >
                <h3 className="text-4xl">Restro</h3>
                <h4 className="text-greenBtn flex items-center gap-1 mt-[-0.6rem]">
                  PRO
                  <span className=" text-black font-bold rounded-full bg-gray-300 text-[0.5rem] px-1">
                    SaaS
                  </span>
                </h4>
              </Link>
            </div>
            <div className="mb-8 lg:mb-0">
              <h2 className="text-2xl font-extrabold mb-3 md:text-start">Links</h2>
              <ul className="flex flex-col gap-2 text-center md:text-left">
                <li className="transition-all hover:translate-x-2 mb-4">
                  <Link to="" onClick={scrollToTop}>
                    Features
                  </Link>
                </li>
                <li className="transition-all hover:translate-x-2 mb-4">
                  <Link to="pricing" onClick={scrollToTop}>
                    {" "}
                    Pricing
                  </Link>
                </li>
                <li className="transition-all hover:translate-x-2">
                  <Link to="contact" onClick={scrollToTop}>
                    {" "}
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mb-8 lg:mb-0">
              <h2 className="text-2xl font-extrabold mb-3 md:text-start">Contact</h2>
              <ul className="flex flex-col gap-2 text-center sm:text-left">
                <li>
                  <span className="flex justify-center md:justify-start items-center mb-4 mx-auto lg:mx-0">
                    <TbPhoneCall /> &nbsp; (123)-456-789
                  </span>
                </li>
                <li>
                  <span className="flex justify-center md:justify-start items-center mb-4 mx-auto lg:mx-0">
                    <TbMail/> &nbsp; restropro@gmail.com{" "}
                  </span>
                </li>
                <li>
                  <span className="flex justify-center md:justify-start items-center mx-auto lg:mx-0">
                    <MdOutlineLocationOn/> &nbsp; Tunis, Tunisia
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col">
              <h1 className="text-2xl font-extrabold mb-3 md:text-start">Stay In Touch</h1>
              <div className="flex justify-center md:justify-start items-center gap-5">
                <a href="" className="transition-all hover:-translate-y-1">
                  <img className="w-[1.5rem]" src={facebook} alt="facebook" />
                </a>
                <a href="" className="transition-all hover:-translate-y-1">
                  <img className="w-[1.5rem]" src={instagram} alt="instagram" />
                </a>
                <a href="" className="transition-all hover:-translate-y-1">
                  <img className="w-[1.5rem]" src={youtube} alt="youtube" />
                </a>
                <a href="" className="transition-all hover:-translate-y-1">
                  <img className="w-[1.5rem]" src={twitter} alt="twitter" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
