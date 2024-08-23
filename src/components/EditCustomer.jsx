import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditCustomer = ({
  customersSearch,
  customerName,
  setCustomerName,
  customerPhone,
  setCustomerPhone,
  handleEdit,
}) => {
  const { id } = useParams();
  console.log("id", id);
  const customer = customersSearch.find((item) => item.id === id);
  const navigate = useNavigate();

  useEffect(() => {
    if (customer) {
      setCustomerName(customer.name);
      setCustomerPhone(customer.phone);
    }
  }, []);

  return (
    <>
      {/* Overlay Edit */}
      <div
        className="absolute flex
        items-center justify-center top-0 left-0 z-99999999 w-full h-full bg-black/50"
      >
        <div className="flex flex-col gap-6 w-[30rem] h-auto bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-extrabold">Edit Customer</h2>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-4"
          >
            <label className="text-[1.1rem] font-medium">Customer's Name</label>
            <input
              autoComplete="off"
              required
              className=" text-sm w-full px-3 py-2 rounded-[5px] border-[1px] border-gray-300 outline-blue-400 mb-4 required"
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            ></input>

            <label htmlFor="editedFloor" className="text-[1.1rem] font-medium">
              Phone Number
            </label>
            <input
              autoComplete="off"
              required
              id="editedFloor"
              type="text"
              className=" text-sm w-full px-3 py-2 rounded-[5px] border-[1px] border-gray-300 outline-blue-400 mb-4 required"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
            ></input>

            <div className="flex flex-row gap-2 items-center justify-end">
              <button
                type="button"
                onClick={() => {
                  navigate(-1);
                  setCustomerName("");
                  setCustomerPhone("");
                }}
                className="text-gray-500 font-semibold flex items-center gap-1 bg-gray-200 rounded-lg p-2 cursor-pointer transition-all hover:bg-gray-300"
              >
                Close
              </button>
              <button
                disabled={!customerName || !customerPhone ? true : false}
                onClick={() => handleEdit(customer.id, customer.datetime)}
                type="submit"
                className={`font-semibold bg-greenBtn text-white rounded-lg p-2 transition-all 
                           ${
                             !customerName || !customerPhone
                               ? "opacity-35"
                               : "hover:bg-greenBtnHover cursor-pointer"
                           }  `}
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

export default EditCustomer;
