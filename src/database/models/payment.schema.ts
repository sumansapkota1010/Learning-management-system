import mongoose, { mongo, Schema } from "mongoose";
import { PaymentMethod } from "../../../types/enum";

enum Status {
  Pending = "pending",
  Completed = "completed",
  Failed = "failed",
}

interface IPayment extends Document {
  amount: number;
  status: Status;
  paymentMethod: PaymentMethod;
  enrollment: mongoose.Types.ObjectId;
}

const paymentSchema = new Schema<IPayment>({
  enrollment: {
    type: Schema.Types.ObjectId,
    ref: "Enrollment",
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
