import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface ICourse extends Document {
  courseName: string;
  description: string;
  price: number;
  duration: string;
  category: mongoose.Types.ObjectId;
  lessons: mongoose.Types.ObjectId[]; // lessons:["212sds12132132123","ssdsad465456454sd","sdsadas15151w5"]
  createdAt: Date;
}

const courseSchema = new Schema<ICourse>({
  courseName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  lessons: [
    {
      type: Schema.Types.ObjectId,
      ref: "Lessons",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
