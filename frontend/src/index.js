import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import App from "./App"; //own created

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import productsReducer, { productsFetch } from "./features/productsSlice"; //own created
import cartReducer, { getTotals } from "./features/cartSlice"; //own created
import { productsApi } from "./features/productsApi"; //own created
import authReducer, { loadUser } from "./features/authSlice";
import ordersSlice from "./features/ordersSlice";
import usersSlice from "./features/usersSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    orders: ordersSlice,
    users: usersSlice,
    cart: cartReducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

// const root = ReactDOM.createRoot(document.getElementById("root"));

store.dispatch(productsFetch());
store.dispatch(getTotals());
store.dispatch(loadUser(null));

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
