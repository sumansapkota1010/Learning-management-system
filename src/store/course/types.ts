import { Status } from "../category/types";

export interface ICourse {
  _id?: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  createdAt?: string;
}

export interface ICourseInitialState {
  courses: ICourse[];
  status: Status;
}
