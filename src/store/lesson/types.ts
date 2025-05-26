import { Status } from "../category/types";

export interface ILessonForData {
  course: string;
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
