import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading";
import Error from "../Error";
import { HiMiniInformationCircle } from "react-icons/hi2";

const Details = ({
  printSettings,
  setPrintSettings,
  loading,
  handleRefresh,
}) => {
  console.log("printSettings", printSettings);
  const [ordersStatus, setOrdersStatus] = useState("IDLE");

  /*printSettings*/

  const [storeDetails, setStoreDetails] = useState(printSettings.storeDetails);
  const [customerDetails, setCustomerDetails] = useState(
    printSettings.customerDetails
  );
  const [header, setHeader] = useState(printSettings.header);
  const [footer, setFooter] = useState(printSettings.footer);

  const handleEditPrintDetails = async (id) => {
    handleRefresh("Data Updated Successfully", "success");
    const updatedPrintSeetting = {
      id,
      storeDetails: storeDetails,
      customerDetails: customerDetails,
      header: header,
      footer: footer,
    };
    try {
      const response = await axios.put(
        `http://localhost:3600/printSettings/${id}`,
        updatedPrintSeetting
      );
      setPrintSettings(response.data);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    const fetchPrintSetting = async () => {
      setOrdersStatus("LOADING");
      try {
        const pritSettingResponse = await axios.get(
          "http://localhost:3600/printSettings"
        );

        setPrintSettings(pritSettingResponse.data[0]);
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

    fetchPrintSetting();
  }, []);

  if (ordersStatus == "ERROR") return <Error />;
  if (ordersStatus == "LOADING") return <Loading />;

  return (
    <div className="flex flex-col p-4 flex-[1]">
      <h1 className="text-xl font-semibold mb-5">Print Settings</h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-5">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-5 w-full text-gray-500 font-semibold"
          >
            <div className="flex flex-rox items-center justify-between">
              <span className="flex flex-row items-center gap-2">
                Show Store Details{" "}
                <HiMiniInformationCircle title="Details like Address, Name, Phone will appear in Receipt!" />
              </span>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={storeDetails}
                  value={storeDetails}
                  onChange={(e) => setStoreDetails(e.target.checked)}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:[#70b56a]  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-greenBtn"></div>
              </label>
            </div>
            <div className="flex flex-rox items-center justify-between ">
              <span className="flex flex-row items-center gap-2">
                Show Customer Details{" "}
                <HiMiniInformationCircle title="Customer Name, Phone, etc. will appear in Receipt!" />
              </span>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={customerDetails}
                  value={customerDetails}
                  onChange={(e) => setCustomerDetails(e.target.checked)}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:[#70b56a]  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-greenBtn"></div>
              </label>
            </div>
            {console.log("storeDetails", storeDetails)}
            {console.log("customerDetails", customerDetails)}
            <label className="text-base mb-1">Header</label>
            <textarea
              className="text-sm font-normal bg-[#f9f9fa] w-full px-3 py-2 rounded-md border-[1px]  outline-none mb-4 required"
              type="text"
              placeholder={header}
              value={header}
              onChange={(e) => setHeader(e.target.value)}
            ></textarea>
            <label className="text-base mb-1">Footer</label>
            <textarea
              className="text-sm font-normal bg-[#f9f9fa] w-full px-3 py-2 rounded-md border-[1px]  outline-none mb-4 required"
              type="text"
              placeholder={footer}
              value={footer}
              onChange={(e) => setFooter(e.target.value)}
            ></textarea>
            <button
              onClick={() => handleEditPrintDetails(printSettings?.id)}
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
