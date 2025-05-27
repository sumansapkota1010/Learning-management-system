import { EnrollmentStatus } from "@/database/models/enrollment.schema";
import { Status } from "../category/types";

export interface IEnrollment {
  student: string;
  course: string;
  enrolledAt: string;
  enrollmentStatus: EnrollmentStatus;
  whatsapp: string;
}

export interface IEnrollmentInitialState {
  enrollments: IEnrollment[];
  status: Status;
}
