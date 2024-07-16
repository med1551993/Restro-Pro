import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUS } from "../utils/status";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
    status: STATUS.IDLE,
  },
  reducers: {
    setUser(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    addToTable(state, action) {
      state.tables.push(action.payload);
    },
    deleteFromTable(state, action) {
      const newTables = state.data.tables.filter(
        (item) => item.id !== action.payload.id
      );
      state.data.tables = newTables;
    },
    updateTables(state, action) {
      let i = state.tables.findIndex((el) => el.id === action.payload.id);
      state.tables[i] = {
        ...state.tables[i],
        number: action.payload.edit.number,
        capacity: action.payload.edit.capacity,
      };
    },
    addMenu(state, action) {
      state.menu.push(action.payload);
    },
    deleteFromMenu(state, action) {
      const newMenu = state.data.menu.filter(
        (item) => item.id !== action.payload.id
      );
      state.data.menu = newMenu;
    },
    updateMenu(state, action) {
      let i = state.menu.findIndex((el) => el.id === action.payload.id);
      state.menu[i] = {
        ...state.menu[i],
        item: action.payload.edit.item,
        price: action.payload.edit.price,
        category: action.payload.edit.category,
      };
    },
    addCustomer(state, action) {
      state.customers.push(action.payload);
    },
    deleteCustomer(state, action) {
      const newCustomer = state.customers.filter(
        (item) => item.id !== action.payload.id
      );
      state.customers = newCustomer;
    },
    updateCustomer(state, action) {
      let i = state.customers.findIndex((el) => el.id === action.payload.id);
      state.customers[i] = {
        ...state.customers[i],
        name: action.payload.edit.name,
        phone: action.payload.edit.phone,
      };
    },
    updateUser(state, action) {
      state.name = action.payload.user.name;
      state.address = action.payload.user.address;
      state.email = action.payload.user.email;
      state.phone = action.payload.user.phone;
      state.currency = action.payload.user.currency;
    },
  },
});

export const {
  setUser,
  setStatus,
  addToTable,
  deleteFromTable,
  updateTables,
  addMenu,
  deleteFromMenu,
  updateMenu,
  addCustomer,
  deleteCustomer,
  updateCustomer,
} = userSlice.actions;

export default userSlice.reducer;

export const fetchUser = () => {
  return async function fetchUserThunk(dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const response = await axios("http://localhost:3600/user");
      console.log('data',response.data)
      dispatch(setUser(response.data));
      dispatch(setStatus(STATUS.IDLE));
    } catch (err) {
      dispatch(setStatus(STATUS.ERROR));
    }
  };
};
