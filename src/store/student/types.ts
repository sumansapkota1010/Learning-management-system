import { Role } from "@/database/models/user.schema";
import { Status } from "../category/types";

export interface IStudent {
  _id: string;
  username: string;
  email: string;
  profileImage: string;
  role: Role;
}

export interface IStudentInitialState {
  students: IStudent[];
  status: Status;
}
