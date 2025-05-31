import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../category/types";
import { EnrollmentStatus } from "@/database/models/enrollment.schema";
import { IEnrollment, IEnrollmentInitialState } from "./types";
import { AppDispatch } from "../store";
import API from "@/http";
import { stat } from "fs";
import { PaymentMethod } from "../../../types/enum";

const Datas: IEnrollmentInitialState = {
  enrollments: [],
  status: Status.Loading,
  paymentUrl: null,
};

export interface IEnrollmentData {
  whatsapp: string;
  course: string;
  paymentMethod: PaymentMethod;
}

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
    setPaymentUrl(state, action) {
      state.paymentUrl = action.payload;
    },
  },
});

export const { setStatus, setEnrollment, setPaymentUrl } =
  enrollmentSlice.actions;
export default enrollmentSlice.reducer;

export function enrollCourse(data: IEnrollmentData) {
  return async function enrollCourseThunk(dispatch: AppDispatch) {
    try {
      const response = await API.post("/enrollment", data, {
        withCredentials: true,
      });
      console.log("Enrollment response:", response.data.data);
      if (response.status === 200) {
        dispatch(setStatus(Status.Success));
        window.location.href = response.data.data.paymentUrl;
      } else {
        dispatch(setStatus(Status.Error));
      }
    } catch (error) {
      dispatch(setStatus(Status.Error));
    }
  };
}

export function fetchEnrollments() {
  return async function fetchEnrollmentsThunk(dispatch: AppDispatch) {
    try {
      const response = await API.get("/enrollment");
      console.log(response.data.data.paymentUrl, "Payment ulr data");
      if (response.status === 200) {
        dispatch(setStatus(Status.Success));
        dispatch(setEnrollment(response.data.data));

        if (response.data.data.paymentUrl) {
          dispatch(setPaymentUrl(response.data.data.paymentUrl));
        }
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
