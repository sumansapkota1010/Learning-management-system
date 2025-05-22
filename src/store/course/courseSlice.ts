import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../category/types";
import { ICourse, ICourseInitialState } from "./types";
import { AppDispatch } from "../store";

import API from "@/http";

const datas: ICourseInitialState = {
  courses: [],
  status: Status.Loading,
};

const courseSlice = createSlice({
  name: "course",
  initialState: datas,
  reducers: {
    setStatus(state: ICourseInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setCourses(state: ICourseInitialState, action: PayloadAction<ICourse[]>) {
      state.courses = action.payload;
    },
  },
});

const { setStatus, setCourses } = courseSlice.actions;

export default courseSlice.reducer;

export function fetchCourses() {
  return async function fetchCoursesThunk(dispatch: AppDispatch) {
    try {
      const response = await API.get("/course");
      console.log(response, "Response");
      if (response.status === 200) {
        dispatch(setStatus(Status.Success));
        dispatch(setCourses(response.data.data));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.Error));
    }
  };
}
