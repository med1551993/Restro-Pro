import React from "react";
import hero from "../images/hero/hero.png";
import { FiCheckCircle } from "react-icons/fi";

const Features = () => {
  return (
    <>
      <section className="global_container py-16">
        <div>
          <img
            src={hero}
            alt="hero"
            className="border-solid border-8 border-black rounded-tl-3xl rounded-3xl"
          />
        </div>

        <div className="bg-white pb-6">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto px-6 p-6 bg-white">
              <div className="mb-16 text-center">
                <h4 className="text-base text-greenBtn font-semibold tracking-wide uppercase">
                  Features
                </h4>
                <p className="mt-2 text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">
                  How we change the game
                </p>
              </div>

              <div className="flex flex-wrap my-12">
                <div className="w-full border-b md:w-1/2 md:border-r lg:w-1/3 p-8">
                  <div className="flex items-center mb-6">
                    <FiCheckCircle size={22} color={"#70b56a"} />
                    <div className="ml-4 text-xl">Time Savings</div>
                  </div>
                  <p className="leading-loose text-gray-500">
                    With streamlined operations and automated processes, this
                    system saves time for both the staff and the customers.
                  </p>
                </div>

                <div className="w-full border-b md:w-1/2 lg:w-1/3 lg:border-r p-8">
                  <div className="flex items-center mb-6">
                    <FiCheckCircle size={22} color={"#70b56a"} />

                    <div className="ml-4 text-xl">Automate reports</div>
                  </div>
                  <p className="leading-loose text-gray-500">
                    With automating accounting reports, restaurants can reduce
                    manual data entry errors, improve financial accuracy, and
                    expedite month-end closing procedures.
                  </p>
                </div>

                <div className="w-full border-b md:w-1/2 md:border-r lg:w-1/3 lg:border-r-0 p-8">
                  <div className="flex items-center mb-6">
                    <FiCheckCircle size={22} color={"#70b56a"} />
                    <div className="ml-4 text-xl">Enhancing Efficiency</div>
                  </div>
                  <p className="leading-loose text-gray-500">
                    By automating routine tasks and optimizing workflows,
                    restaurants can minimize errors, reduce overhead costs, and
                    focus on delivering exceptional dining experiences.
                  </p>
                </div>

                <div className="w-full border-b md:w-1/2 lg:w-1/3 lg:border-r lg:border-b-0 p-8">
                  <div className="flex items-center mb-6">
                    <FiCheckCircle size={22} color={"#70b56a"} />
                    <div className="ml-4 text-xl">Analytics and reporting</div>
                  </div>
                  <p className="leading-loose text-gray-500">
                    the restaurant owners can dive deeper into the performance
                    of their restaurants by viewing the reports that the system
                    provides.{" "}
                    {/* This empowers you to make informed decisions and
                    drive better profits. */}
                  </p>
                </div>

                <div className="w-full border-b md:w-1/2 md:border-r md:border-b-0 lg:w-1/3 lg:border-b-0 p-8">
                  <div className="flex items-center mb-6">
                    <FiCheckCircle size={22} color={"#70b56a"} />
                    <div className="ml-4 text-xl">Better customer orders</div>
                  </div>
                  <p className="leading-loose text-gray-500">
                    With streamlined operations and automated processes, this
                    system saves time for both the staff and the customers.
                  </p>
                </div>

                <div className="w-full md:w-1/2 lg:w-1/3 p-8">
                  <div className="flex items-center mb-6">
                    <FiCheckCircle size={22} color={"#70b56a"} />
                    <div className="ml-4 text-xl">Floor Management</div>
                  </div>
                  <p className="leading-loose text-gray-500">
                    By optimizing floor management, restaurants can minimize
                    wait times, maximize table turnover, and improve operational
                    efficiency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
