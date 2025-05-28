import { Status } from "../category/types";

export interface ICategory {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface ICourse {
  _id?: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  category: ICategory;
  createdAt?: string;
}

export interface ICourseInitialState {
  courses: ICourse[];
  status: Status;
}
