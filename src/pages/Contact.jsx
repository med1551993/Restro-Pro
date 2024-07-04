import React from "react";
import { TbPhoneCall } from "react-icons/tb";
import { TbMail } from "react-icons/tb";
import { MdOutlineLocationOn } from "react-icons/md";
import { BsSend } from "react-icons/bs";

const Contact = () => {
  return (
    <>
      <section className="global_container py-24">
        <div className="flex flex-col lg:flex-row lg:justify-center items-center lg:items-start gap-20 lg:gap-32 lg:p-2 bg-[url('/src/images/contact/bg-contact.png')] bg-auto bg-no-repeat bg-center">
          <div className="flex flex-col text-center lg:text-left max-w-[30rem]">
            <h2 className="text-3xl font-bold sm:text-4xl leading-8 mb-8">
              Need additional information?
            </h2>
            <p className="text-lg leading-8 text-gray-600 mb-8">
              A multifaceted professional skilled in multiple fields of
              research, development as well as a learning specialist. Over 15
              years of experience.
            </p>
            <span className="flex items-center text-lg font-bold mb-4 mx-auto lg:mx-0">
              <TbPhoneCall size={25} /> &nbsp; (123)-456-789
            </span>
            <span className="flex items-center text-lg font-bold mb-4 mx-auto lg:mx-0">
              <TbMail size={25} /> &nbsp; restropro@gmail.com{" "}
            </span>
            <span className="flex items-center text-lg font-bold mx-auto lg:mx-0">
              {" "}
              <MdOutlineLocationOn size={25} /> &nbsp; Tunis, Tunisia{" "}
            </span>
          </div>

          <div className="flex flex-col w-full">
            <form className="flex flex-col w-full">
              <label className="text-[1.1rem] font-medium mb-1">
                Full Name <b className="text-[red]">*</b>
              </label>

              <input
                className="bg-[#f2f2f2] w-full px-3 py-2 rounded-md border-none outline-none mb-4 required"
                type="text"
                placeholder="E.g: Foulen Fouleni"
              ></input>
              <label className="text-[1.1rem] font-medium mb-1">
                Email <b className="text-[red]">*</b>
              </label>

              <input
                className="bg-[#f2f2f2] px-3 py-2 rounded-md border-none outline-none mb-4"
                type="email"
                placeholder="foulenmail@example.com"
              ></input>
              <label className="text-[1.1rem] font-medium mb-1">
                Tell us about it <b className="text-[red]">*</b>
              </label>
              <textarea
                className="bg-[#f2f2f2] px-3 py-2 rounded-md border-none outline-none mb-4 h-32"
                placeholder="Write here..."
              ></textarea>

              <button
                type="submit"
                className="flex justify-center gap-3 bg-greenBtn rounded-md px-3 py-2 text-white font-bold  transition-all hover:bg-greenBtnHover"
              >
                <BsSend size={25} /> &nbsp; Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
