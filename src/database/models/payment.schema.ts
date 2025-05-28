import mongoose, { mongo, Schema } from "mongoose";
import { PaymentMethod } from "../../../types/enum";

enum Status {
  Pending = "pending",
  Completed = "completed",
  Failed = "failed",
}

interface IPayment extends Document {
  student: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  amount: number;
  status: Status;
  paymentMethod: PaymentMethod;
}

const paymentSchema = new Schema<IPayment>({
  student: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: [Status.Completed, Status.Pending, Status.Failed],
    default: Status.Pending,
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
