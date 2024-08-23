import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import Loading from "../Loading";

const PaymentType = ({
  payments,
  paymentTypeTitle,
  setPaymentTypeTitle,
  paymentOverlay,
  setPaymentOverlay,
  handlePaymentSubmit,
  handlePaymentDelete,
  handleEditPayment,
  loading,
}) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`absolute ${
          paymentOverlay ? "flex" : "hidden"
        } items-center justify-center top-0 left-0 z-50 w-full h-full bg-black/50`}
      >
        <div className="flex flex-col gap-6 w-[30rem] h-auto bg-white rounded-2xl p-6 shadow-lg ml-3 mr-3">
          <h2 className="text-lg font-extrabold">Adding new Payment Type</h2>
          <form onSubmit={handlePaymentSubmit} className="flex flex-col gap-4">
            <label className="text-base font-medium">Payment Type Title</label>
            <input
              placeholder="Enter Payment Type"
              autoComplete="off"
              className=" text-sm w-full px-3 py-2 rounded-[5px] border-[1px] border-gray-300 outline-blue-400 mb-4 required"
              type="text"
              value={paymentTypeTitle}
              onChange={(e) => setPaymentTypeTitle(e.target.value)}
            ></input>

            <div className="flex flex-row gap-2 items-center justify-end">
              <span
                className="text-gray-500 font-semibold flex items-center gap-1 bg-gray-200 rounded-lg p-2 cursor-pointer transition-all hover:bg-gray-300"
                onClick={() => {
                  setPaymentOverlay(false);
                  setPaymentTypeTitle("");
                }}
              >
                Close
              </span>
              <button
                disabled={!paymentTypeTitle ? true : false}
                onClick={() => handlePaymentSubmit}
                type="submit"
                className={`font-semibold bg-greenBtn text-white rounded-lg p-2 transition-all 
                        ${
                          !paymentTypeTitle
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

      <div className="flex flex-col p-4 flex-[1]">
        <span className="flex flex-row items-center gap-5 mb-5">
          <h1 className="text-xl font-semibold">Paymen Types</h1>
          <button
            onClick={() => setPaymentOverlay(true)}
            className="font-bold text-gray-500 flex items-center justify-center gap-2 bg-[#f9f9fa] cursor-pointer transition-all hover:bg-gray-200 border-[1px] rounded-xl px-2 py-1"
          >
            + New
          </button>
        </span>

        {loading ? (
          <Loading />
        ) : (
          <table className="table-auto border-2">
            <thead className="border-b-[1px]">
              <tr className="text-gray-500 bg-gray-200 *:text-sm *:text-start *:p-2 ">
                <th>ID</th>
                <th className="w-2/3">Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-xs font-semibold [&>*:nth-child(even)]:bg-gray-100">
              {/*  {payments?.length === 0
                ? "Add your payment types here."
                :  */}

              {payments?.map((item) => (
                <tr className="*:p-2" key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.typeTitel}</td>
                  <td>
                    <div className="flex flex-row items-center gap-2">
                      <RiDeleteBinLine
                        size={15}
                        onClick={() => handlePaymentDelete(item.id)}
                        className="text-[red] cursor-pointer"
                      />
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={item.typeActive}
                          value={item.typeActive}
                          onChange={(e) => handleEditPayment(item.id)}
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:[#70b56a]  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-greenBtn"></div>
                      </label>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default PaymentType;
