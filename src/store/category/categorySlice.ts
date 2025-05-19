import { createSlice } from "@reduxjs/toolkit";
import { ICategoryInitialState, Status } from "./types";

const datas: ICategoryInitialState = {
  categories: [],
  status: Status.Loading,
};

const categorySlice = createSlice({
  name: "category",
  initialState: datas,
  reducers: {
    setStatus(state, action) {
      state.categories = action.payload;
    },
    setCategories(state, action) {
      state.categories = action.payload;
    },
  },
});

const { setStatus, setCategories } = categorySlice.actions;

export default categorySlice.reducer;
