import { Status } from "../category/types";
import { IPayment } from "../../../types/payment";
import { EnrollmentStatus } from "../../../types/enum";

interface IStudent {
  _id: string;
  username: string;
  email: string;
}

interface ICourse {
  _id: string;
  title: string;
  price: number;
}

export interface IEnrollment {
  _id: string;
  student: IStudent;
  course: ICourse;
  enrolledAt: string;
  enrollmentStatus: EnrollmentStatus;
  whatsapp: string;
  payment: IPayment;
}

export interface IEnrollmentInitialState {
  enrollments: IEnrollment[];
  status: Status;
  paymentUrl: null | string;
}
