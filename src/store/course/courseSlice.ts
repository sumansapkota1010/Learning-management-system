import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../category/types";
import { ICategory, ICourse, ICourseInitialState } from "./types";
import { AppDispatch } from "../store";

import API from "@/http";
import { PaymentMethod } from "../../../types/enum";

const datas: ICourseInitialState = {
  courses: [],
  status: Status.Loading,
};

const courseSlice = createSlice({
  name: "course",
  initialState: datas,
  reducers: {
    setStatus(state: ICourseInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setCourses(state: ICourseInitialState, action: PayloadAction<ICourse[]>) {
      state.courses = action.payload;
    },
    addCourse(state: ICourseInitialState, action: PayloadAction<ICourse>) {
      state.courses.push(action.payload);
    },
    updateCourse(state:ICourseInitialState,action:PayloadAction<ICourse>){
      state.courses = state.courses.map((course)=> course._id ===action.payload._id? action.payload : course)
    },
    deleteCourseByFilter(
      state: ICourseInitialState,
      action: PayloadAction<string>
    ) {
      state.courses = state.courses.filter(
        (course) => course._id !== action.payload
      );
    },
    resetCourseStatus(state) {
      state.status = Status.Loading;
    },
  },
});

export const {
  setStatus,
  setCourses,
  addCourse,
  updateCourse,
  deleteCourseByFilter,
  resetCourseStatus,
} = courseSlice.actions;

export default courseSlice.reducer;

export function fetchCourses() {
  return async function fetchCoursesThunk(dispatch: AppDispatch) {
    try {
      const response = await API.get("/course");
      
      if (response.status === 200) {
        dispatch(setCourses(response.data.data));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.Error));
    }
  };
}

export function fetchSingleCourse(id:string){
  return async function fetchSingleCourseThunk(dispatch:AppDispatch){
    try {
      const response = await API.get("/course/"+id)
      console.log(response,"Single Course")
      if(response.status ===200){
        return response.data.data
      } else{
         dispatch(setStatus(Status.Error))
      }

    } catch (error) {
      console.log(error)
       dispatch(setStatus(Status.Error))
    }
  }
}

export function addCourses(data: ICourse) {
  return async function addCoursesThunk(dispatch: AppDispatch) {
    try {
      const response = await API.post("/course", data);
      if (response.status === 201) {
        dispatch(setStatus(Status.Success));
        dispatch(addCourse(response.data.data));
      } else {
        dispatch(setStatus(Status.Error));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.Error));
    }
  };
}

type Data ={
  _id?: string;
    title: string;
    description: string;
    price: number;
    duration: string;
    category: ICategory;
    
}


export function editCourse(id:string,data:Data){
  return async function editCourseThunk (dispatch:AppDispatch){
    try {
      const response = await API.patch(`/course/${id}`,data)
      console.log(response.data.data)
      if(response.status =200){
        dispatch(setStatus(Status.Success))
        dispatch(updateCourse(response.data.data))
      }
      else{
        dispatch(setStatus(Status.Error))
      }
    } catch (error) {
      console.log(error)
       dispatch(setStatus(Status.Error))
      
    }
  }

}

export function deleteCourses(id: string) {
  return async function deteteCoursesThunk(dispatch: Dispatch) {
    try {
      const response = await API.delete("/course/" + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.Success));
        dispatch(deleteCourseByFilter(id));
      } else {
        dispatch(setStatus(Status.Error));
      }
    } catch (error) {
      dispatch(setStatus(Status.Error));
    }
  };
}
