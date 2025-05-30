import mongoose, { Schema } from "mongoose";
import { PaymentMethod } from "../../../types/enum";

export enum PaymentStatus {
  Pending = "pending",
  Completed = "completed",
  Failed = "failed",
}

interface IPayment extends mongoose.Document {
  amount: number;
  status: PaymentStatus;
  paymentMethod: PaymentMethod;
  enrollment: mongoose.Types.ObjectId;
  pidx: string;
}

const paymentSchema = new Schema<IPayment>({
  enrollment: {
    type: Schema.Types.ObjectId,
    ref: "Enrollment",
    required: false,
  },

  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: [
      PaymentStatus.Completed,
      PaymentStatus.Pending,
      PaymentStatus.Failed,
    ],
    default: PaymentStatus.Pending,
  },
  pidx: {
    type: String,
  },
  paymentMethod: {
    type: String,
    enum: [PaymentMethod.Khalti, PaymentMethod.Esewa],
    default: PaymentMethod.Khalti,
  },
});

const Payment =
  mongoose.models.Payment || mongoose.model("Payment", paymentSchema);

export default Payment;
