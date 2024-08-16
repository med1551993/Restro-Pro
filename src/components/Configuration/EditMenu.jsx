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
  selectedImage,
  setSelectedImage,
}) => {
  const { id } = useParams();

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
        <div className="flex flex-col gap-6 w-[50rem] h-auto bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-extrabold">Edit Menu</h2>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-center w-[20rem]">
                <label
                  for="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-60 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Upload Menu Image</span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
              {/*  <div className="flex flex-col gap-2">
                <label className="text-[1.1rem] font-medium">
                  Upload Menu Image
                </label>
                <input
                  className="w-[10rem] h-[10rem] bg-orange-400 "
                  type="file"
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                ></input>
                <img src={selectedImage} alt="sre" />
              </div> */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="editedname"
                  className="text-[1.1rem] font-medium"
                >
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

                <label
                  htmlFor="editcategory"
                  className="text-[1.1rem] font-medium"
                >
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

                <label
                  htmlFor="editedprice"
                  className="text-[1.1rem] font-medium"
                >
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
              </div>
            </div>
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
