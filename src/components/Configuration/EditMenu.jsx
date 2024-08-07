import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
const EditMenu = ({
  menu,
  menuName,
  setMenuName,
  menuCategory,
  setMenuCategory,
  menuPrice,
  setMenuPrice,
  handleEditMenu,
}) => {
  const { id } = useParams();
  console.log("id", id);
  const food = menu.find((item) => item.id === id);
  const navigate = useNavigate();

  useEffect(() => {
    if (food) {
      setMenuName(food.name);
      setMenuCategory(food.category);
      setMenuPrice(food.price);
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
          <h2 className="text-lg font-extrabold">Adding new Menu</h2>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-4"
          >
            <label htmlFor="editedname" className="text-[1.1rem] font-medium">
              Name
            </label>
            <input
              autoComplete="off"
              id="editedname"
              required
              className=" text-sm w-full px-3 py-2 rounded-[5px] border-[1px] border-gray-300 outline-blue-400 mb-4 required"
              type="text"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
            ></input>

            <label htmlFor="editcategory" className="text-[1.1rem] font-medium">
              Category
            </label>
            <input
              autoComplete="off"
              id="editcategory"
              required
              className=" text-sm w-full px-3 py-2 rounded-[5px] border-[1px] border-gray-300 outline-blue-400 mb-4 required"
              type="text"
              value={menuCategory}
              onChange={(e) => setMenuCategory(e.target.value)}
            ></input>

            <label htmlFor="editedprice" className="text-[1.1rem] font-medium">
              Price
            </label>
            <input
              autoComplete="off"
              required
              id="editedprice"
              type="text"
              className=" text-sm w-full px-3 py-2 rounded-[5px] border-[1px] border-gray-300 outline-blue-400 mb-4 required"
              value={menuPrice}
              onChange={(e) => setMenuPrice(e.target.value)}
            ></input>
            <div className="flex flex-row gap-2 items-center justify-end">
              <span
                onClick={() => {
                  navigate(-1);
                  setMenuName("");
                  setMenuCategory("");
                  setMenuPrice("");
                }}
                className="text-gray-500 font-semibold flex items-center gap-1 bg-gray-200 rounded-lg p-2 cursor-pointer transition-all hover:bg-gray-300"
              >
                Close
              </span>
              <button
                disabled={!menuName || !menuPrice ? true : false}
                onClick={() => handleEditMenu(food.id)}
                type="submit"
                className={`font-semibold bg-greenBtn text-white rounded-lg p-2 transition-all 
                           ${
                             !menuName || !menuPrice
                               ? "opacity-35"
                               : "hover:bg-greenBtnHover cursor-pointer"
                           }  `}
              >
                Edit Menu
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditMenu;
