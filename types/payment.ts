import { PaymentStatus } from "@/database/models/payment.schema";
import { IEnrollment } from "@/store/enrollment/types";
import { PaymentMethod } from "./enum";

export interface IPayment {
  _id: string;
  enrollment: IEnrollment;
  status: PaymentStatus;
  pidx: string;
  paymentMethod: PaymentMethod;
}
