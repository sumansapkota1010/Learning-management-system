export enum Status {
  Loading = "loading",
  Success = "sucess",
  Error = "Error",
}

export interface ICategory {
  _id: string;
  description: string;
  name: string;
  createdAt: string;
}

export interface ICategoryInitialState {
  categories: ICategory[];
  status: Status;
}

export const datas: ICategoryInitialState = {
  categories: [],
  status: Status.Loading,
};
