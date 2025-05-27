import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../category/types";
import { EnrollmentStatus } from "@/database/models/enrollment.schema";
import { IEnrollment, IEnrollmentInitialState } from "./types";
import { AppDispatch } from "../store";
import API from "@/http";
import { stat } from "fs";

const Datas: IEnrollmentInitialState = {
  enrollments: [],
  status: Status.Loading,
};

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState: Datas,
  reducers: {
    setStatus(state: IEnrollmentInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },

    setEnrollment(
      state: IEnrollmentInitialState,
      action: PayloadAction<IEnrollment[]>
    ) {
      state.enrollments = action.payload;
    },
  },
});

export const { setStatus, setEnrollment } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;

export function fetchEnrollments() {
  return async function fetchEnrollmentsThunk(dispatch: AppDispatch) {
    try {
      const response = await API.get("/enrollment");
      if (response.status === 200) {
        dispatch(setStatus(Status.Success));
        dispatch(setEnrollment(response.data.data));
      } else {
        dispatch(setStatus(Status.Error));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.Error));
    }
  };
}

export function editEnrollmentStatus(id: string, status: EnrollmentStatus) {
  return async function editEnrollmentStatusThunk(dispatch: AppDispatch) {
    try {
      const response = await API.patch(`/enrollment/${id}`, { status: status });
      console.log(response.data.data);
    } catch (error) {}
  };
}
