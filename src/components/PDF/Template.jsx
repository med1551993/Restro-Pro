import ReactPrint from "react-to-print";
import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Barcode from "react-barcode";

function PdfTemplate({ invoices, action }) {
  const ref = useRef();

  const { id } = useParams();
  const invoice = invoices.find((item) => item.data.id === id);

  const navigate = useNavigate();

  return (
    <>
      <div
        className="absolute flex flex-col gap-2
        items-center justify-center top-0 left-0 z-99999999 w-full bg-black/50"
      >
        <div
          className="bg-white w-full lg:w-[60rem] px-10 py-16 mt-6"
          ref={ref}
        >
          <div className="w-full flex flex-col justify-center gap-24">
            <div className="flex flex-row items-center justify-between">
              <div>
                <Barcode
                  value={`4n%${invoice.id}+ut%`}
                  width={1}
                  height={50}
                  displayValue={false}
                />
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-2xl text-[#325aa8]">
                  <strong>Company</strong>
                </h4>
                <p>(+91) 1234567890</p>
                <p>sample@gmail.com</p>
              </div>
            </div>

            <div className="m-auto">
              <div className="flex flex-col text-center">
                <h2 className="text-4xl font-extrabold text-[#325aa8]">
                  INVOICE
                </h2>
                <h5 className="font-semibold"> Id: {invoice.id}</h5>
              </div>
            </div>

            <div className="w-full">
              <table className="w-full">
                <thead className="p-2">
                  <tr className=" *:text-start">
                    <th>
                      <h5 className="py-2">Products</h5>
                    </th>
                    <th>
                      <h5>Quantity</h5>
                    </th>
                    <th>
                      <h5>Amount</h5>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.data.data.length
                    ? invoice.data.data.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td className="py-2">{item.name}</td>
                            <td>{item.qty}</td>
                            <td>${item.price * item.qty} </td>
                          </tr>
                        );
                      })
                    : null}
                  <tr className="border-t-[1px]  border-b-[1px] *:py-2">
                    <td>
                      <p>
                        <strong>Total Amount: </strong>
                      </p>

                      <p>
                        <strong>Payable Amount: </strong>
                      </p>
                    </td>
                    <td></td>
                    <td>
                      <p>
                        <strong>
                          $
                          {invoice.data.data.reduce((cartTotal, cartItem) => {
                            return (cartTotal =
                              cartTotal + cartItem.price * cartItem.qty);
                          }, 0)}
                        </strong>
                      </p>

                      <p>
                        <strong>
                          $
                          {invoice.data.data.reduce((cartTotal, cartItem) => {
                            return (cartTotal =
                              cartTotal + cartItem.price * cartItem.qty);
                          }, 0)}
                        </strong>
                      </p>
                    </td>
                  </tr>
                  <tr className="text-[#F81D2D] text-xl font-bold *:py-2">
                    <td>
                      <h4>Total:</h4>
                    </td>
                    <td className=""></td>
                    <td className="text-left">
                      $
                      {invoice.data.data.reduce((cartTotal, cartItem) => {
                        return (cartTotal =
                          cartTotal + cartItem.price * cartItem.qty);
                      }, 0)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-2">
              <p>
                <b>Date :</b> {invoice.data.date}{" "}
              </p>

              <p>
                <b>Customer: {invoice.data.customer}</b>
              </p>
              <p>
                <b>Contact: (+91) 1234567890</b>
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center justify-end mw-[50rem]">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 font-semibold flex gap-1 bg-gray-200 rounded-lg p-2 cursor-pointer transition-all hover:bg-gray-300"
          >
            Close
          </button>
          {action == "print" ? (
            <ReactPrint
              trigger={() => (
                <button className="font-semibold bg-greenBtn text-white rounded-lg p-2 cursor-pointer transition-all  hover:bg-greenBtnHover">
                  Print
                </button>
              )}
              content={() => ref.current}
              documentTitle={`INVOICE ${invoice.id}`}
            />
          ) : null}
          {/*   <button className="font-semibold bg-greenBtn text-white rounded-lg p-2 cursor-pointer transition-all  hover:bg-greenBtnHover">
            Print
          </button> */}
        </div>
      </div>
    </>
  );
}

export default PdfTemplate;
