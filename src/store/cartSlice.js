import { createSlice } from "@reduxjs/toolkit";

const storeInLocalStorage = (data) => {
  localStorage.setItem("cart", JSON.stringify(data));
};

const fetchFromLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(cart);
  } else {
    return [];
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: fetchFromLocalStorage(),
    Dining_Option: "",
    table_option: "",
    totalItems: 0,
    totalAmount: 0,
  },
  reducers: {
    addToCart(state, action) {
      const tempItem = state.data.find((item) => item.id === action.payload.id);
      if (tempItem) {
        const tempCart = state.data.map((item) => {
          if (item.id === action.payload.id) {
            let newQty = item.qty + 1;
            return { ...item, qty: newQty };
          } else {
            return item;
          }
        });
        state.data = tempCart;
        storeInLocalStorage(state.data);
      } else {
        state.data.push(action.payload);
        storeInLocalStorage(state.data);
      }
    },
    removeFromCart(state, action) {
      const newCart = state.data.filter(
        (item) => item.id !== action.payload.id
      );
      state.data = newCart;
      storeInLocalStorage(state.data);
    },
    toggleCartQty(state, action) {
      const tempCart = state.data.map((item) => {
        if (item.id === action.payload.id) {
          let tempQty = item.qty;
          if (action.payload.type === "INC") {
            tempQty++;
          }
          if (action.payload.type === "DEC") {
            tempQty--;
            if (tempQty < 1) {
              tempQty = 1;
            }
          }
          return { ...item, qty: tempQty };
        } else {
          return item;
        }
      });

      state.data = tempCart;
      storeInLocalStorage(state.data);
    },
    clearCart(state) {
      state.data = [];
      storeInLocalStorage(state.data);
    },
    getCartTotal(state) {
      state.totalAmount = state.data.reduce((cartTotal, cartItem) => {
        return (cartTotal = cartTotal + cartItem.price * cartItem.qty);
      }, 0);
      state.totalItems = state.data.length;
    },
    setDining_option(state, action) {
      state.Dining_Option = action.payload;
    },
    setTable_option(state, action) {
      state.table_option = action.payload;
    },
    setNotes(state, action) {
      const tempCart = state.data.map((item) => {
        if (item.id === action.payload.id) {
          let newNotes = action.payload.notes;
          return { ...item, notes: newNotes };
        } else {
          return item;
        }
      });
      state.data = tempCart;
      storeInLocalStorage(state.data);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  toggleCartQty,
  clearCart,
  getCartTotal,
  setDining_option,
  setTable_option,
  setNotes,
} = cartSlice.actions;
export default cartSlice.reducer;
