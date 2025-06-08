import { Status } from "../category/types";
import { ICourse } from "../course/types";

// For creating/updating lessons (what you SEND to backend)
export interface ILessonForData {
  course: string;
  videoUrl: string;
  title: string;
  description: string;
}

// For lesson responses (what you GET from backend)
export interface ILesson extends Omit<ILessonForData, "course"> {
  _id: string;
  createdAt?: string;
  course: ICourse;
}

export interface ILessonInitialState {
  lessons: ILesson[];
  status: Status;
}
