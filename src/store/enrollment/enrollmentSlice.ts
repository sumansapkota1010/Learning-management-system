import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../category/types";
import { EnrollmentStatus } from "@/database/models/enrollment.schema";
import { IEnrollment, IEnrollmentInitialState } from "./types";

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
