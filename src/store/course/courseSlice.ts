import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
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
    addCourse(state: ICourseInitialState, action: PayloadAction<ICourse>) {
      state.courses.push(action.payload);
    },
    deleteCourseByFilter(
      state: ICourseInitialState,
      action: PayloadAction<string>
    ) {
      state.courses = state.courses.filter(
        (course) => course._id !== action.payload
      );
    },
    resetCourseStatus(state) {
      state.status = Status.Loading;
    },
  },
});

export const {
  setStatus,
  setCourses,
  addCourse,
  deleteCourseByFilter,
  resetCourseStatus,
} = courseSlice.actions;

export default courseSlice.reducer;

export function fetchCourses() {
  return async function fetchCoursesThunk(dispatch: AppDispatch) {
    try {
      const response = await API.get("/course");
      console.log(response, "Response");
      if (response.status === 200) {
        dispatch(setCourses(response.data.data));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.Error));
    }
  };
}

export function addCourses(data: ICourse) {
  return async function addCoursesThunk(dispatch: AppDispatch) {
    try {
      const response = await API.post("/course", data);
      if (response.status === 201) {
        dispatch(setStatus(Status.Success));
        dispatch(addCourse(response.data.data));
      } else {
        dispatch(setStatus(Status.Error));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.Error));
    }
  };
}

export function deleteCourses(id: string) {
  return async function deteteCoursesThunk(dispatch: Dispatch) {
    try {
      const response = await API.delete("/course/" + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.Success));
        dispatch(deleteCourseByFilter(id));
      } else {
        dispatch(setStatus(Status.Error));
      }
    } catch (error) {
      dispatch(setStatus(Status.Error));
    }
  };
}
