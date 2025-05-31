import { Status } from "../category/types";
import { ICourse } from "../course/types";

export interface ILessonForData {
  course: ICourse;
  videoUrl: string;
  title: string;
  description: string;
}
export interface ILesson extends ILessonForData {
  _id?: string;

  createdAt?: string | undefined;
}

export interface ILessonInitialState {
  lessons: ILesson[];
  status: Status;
}
