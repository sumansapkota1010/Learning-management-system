import { Role } from "@/database/models/user.schema";
import { createSlice } from "@reduxjs/toolkit";
import { Status } from "../category/types";
import { IStudentInitialState } from "./types";
import { AppDispatch } from "../store";
import API from "@/http";

const Datas: IStudentInitialState = {
  students: [],
  status: Status.Loading,
};

const studentSlice = createSlice({
  name: "student",
  initialState: Datas,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    setStudent(state, action) {
      state.students = action.payload;
    },
  },
});

export const { setStatus, setStudent } = studentSlice.actions;
export default studentSlice.reducer;

export function fetchStudents() {
  return async function fetchStudentsThunk(dispatch: AppDispatch) {
    try {
      const response = await API.get("/student");
      if (response.status === 200) {
        dispatch(setStatus(Status.Success));
        dispatch(setStudent(response.data.data));
      }
    } catch (error) {
      dispatch(setStatus(Status.Error));
    }
  };
}
