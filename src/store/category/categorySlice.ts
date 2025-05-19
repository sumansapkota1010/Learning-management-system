import { createSlice } from "@reduxjs/toolkit";
import { ICategoryInitialState, Status } from "./types";
import { AppDispatch } from "../store";
import axios from "axios";

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

function fetchCategories() {
  return async function fetchCategoriesThunk(dispatch: AppDispatch) {
    try {
      const response = await axios.get("http://localhost:3000/api/category");
      if (response.status == 200) {
        dispatch(setStatus(Status.Success));
        dispatch(setCategories(response.data.data));
      } else {
        dispatch(setStatus(Status.Error));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.Error));
    }
  };
}
