import { createSlice } from "@reduxjs/toolkit";

const fetchFromLocalStorage = () => {
  let user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  } else {
    return {};
  }
};

const storeInLocalStorage = (date) => {
    localStorage.setItem('user',JSON.stringify(data))
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    address: "",
    phone: "",
    email: "",
    currency: "",
    tables: [], //list of objects
    menu: [], //list of objects
    customers: [], //list of objects
  },
  reducers: {
    addToTable(state, action) {
      state.tables.push(action.payload);
    },
    deleteFromTable(state, action) {
      const newTables = state.tables.filter(
        (item) => item.id !== action.payload.id
      );
      state.tables = newTables;
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
      const newMenu = state.menu.filter(
        (item) => item.id !== action.payload.id
      );
      state.manu = newMenu;
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
  addToTable,
  deleteFromTable,
  updateTables,
  addMenu,
  deleteFromMenu,
  updateMenu,
  addCustomer,
  deleteCustomer,
  updateCustomer,
} = TaskSlice.actions;

export default userSlice.reducer;
