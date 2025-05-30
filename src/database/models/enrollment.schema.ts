import mongoose, { Schema, Document } from "mongoose";

export enum EnrollmentStatus {
  Approved = "approved",
  Rejected = "rejected",
  Pending = "pending",
}

interface IEnrollment extends Document {
  student: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  payment?: mongoose.Types.ObjectId;
  enrolledAt: Date;
  enrollmentStatus: EnrollmentStatus;
  whatsapp?: string;
}

const enrollmentSchema = new Schema<IEnrollment>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Student reference is required"],
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course reference is required"],
    },
    payment: {
      type: Schema.Types.ObjectId,
      ref: "Payment",
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
    enrollmentStatus: {
      type: String,
      enum: Object.values(EnrollmentStatus),
      default: EnrollmentStatus.Pending,
      required: true,
    },
    whatsapp: {
      type: String,
      trim: true,
      validate: {
        validator: (v: string) => v.length >= 5,
        message: "WhatsApp number is too short",
      },
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const Enrollment =
  (mongoose.models.Enrollment as mongoose.Model<IEnrollment>) ||
  mongoose.model<IEnrollment>("Enrollment", enrollmentSchema);

export default Enrollment;
