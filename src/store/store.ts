import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./category/categorySlice";
import paymentSlice from "./payment/paymentSlice";

configureStore({
  reducer: {
    category: categorySlice,
    payment: paymentSlice,
  },
});
