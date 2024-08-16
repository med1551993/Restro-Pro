import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const EditNotes = ({ setNotes, cartItems }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [note, setNote] = useState("");

  const currentNote = cartItems.find((item) => item.id === id).notes;
  useEffect(() => {
    setNote(currentNote);
  }, []);

  return (
    <>
      <div className="absolute flex items-center justify-center top-0 left-0 z-99999999 w-full h-full bg-black/50">
        <div className="flex flex-col gap-6 w-[30rem] h-auto bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-extrabold">
            Feel free to write your notes here
          </h2>
          <div className="flex flex-row gap-4">
            <textarea
              className="bg-[#f9f9fa] w-full h-[10rem] px-3 py-2 rounded-md border-2 outline-none mb-4 required"
              type="text"
              placeholder={note}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </div>
          <div className="flex flex-row gap-2 items-center justify-end">
            <button
              className="text-gray-500 font-semibold flex items-center gap-1 bg-gray-200 rounded-lg p-2 cursor-pointer transition-all hover:bg-gray-300"
              onClick={() => navigate(-1)}
            >
              Close
            </button>
            <button
              onClick={() => {
                dispatch(setNotes({ id: id, notes: note }));
                navigate(-1);
                setNote("");
              }}
              className="font-semibold bg-greenBtn text-white rounded-lg p-2 cursor-pointer transition-all  hover:bg-greenBtnHover"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditNotes;
