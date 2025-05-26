import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../category/types";
import { ILesson, ILessonForData, ILessonInitialState } from "./types";
import { AppDispatch } from "../store";
import API from "@/http";

const initialState: ILessonInitialState = {
  lessons: [],
  status: Status.Loading,
};

const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    setStatus(state: ILessonInitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setLesson(state: ILessonInitialState, action: PayloadAction<ILesson[]>) {
      state.lessons = action.payload;
      state.status = Status.Success;
    },
    pushToLesson(state: ILessonInitialState, action: PayloadAction<ILesson>) {
      state.lessons.push(action.payload);
      state.status = Status.Success;
    },
    deleteLessonByFilter(state, action: PayloadAction<string>) {
      state.lessons = state.lessons.filter(
        (lesson) => lesson._id !== action.payload
      );
      state.status = Status.Success;
    },
    resetLessonStatus(state) {
      state.status = Status.Loading;
    },
  },
});

export const {
  setStatus,
  setLesson,
  pushToLesson,
  deleteLessonByFilter,
  resetLessonStatus,
} = lessonSlice.actions;
export default lessonSlice.reducer;

export function fetchLessons(id: string) {
  return async function fetchLessonsThunk(dispatch: AppDispatch) {
    try {
      const response = await API.get("/lesson?courseId=" + id);
      if (response.status == 200) {
        dispatch(setLesson(response.data.data));
      } else {
        dispatch(setStatus(Status.Error));
      }
    } catch (error) {
      dispatch(setLesson([]));
      console.log(error);
      dispatch(setStatus(Status.Error));
    }
  };
}

export function addLesson(data: ILessonForData) {
  return async function addLessonThunk(dispatch: AppDispatch) {
    dispatch(resetLessonStatus());
    try {
      const response = await API.post("/lesson", data);
      if (response.status === 200) {
        dispatch(pushToLesson(response.data.data));
      } else {
        dispatch(setStatus(Status.Error));
      }
    } catch (error) {
      dispatch(setLesson([]));
      console.log(error);
      dispatch(setStatus(Status.Error));
    }
  };
}

export function deleteLesson(id: string) {
  return async function deleteLessonThunk(dispatch: AppDispatch) {
    dispatch(resetLessonStatus());
    try {
      const response = await API.delete(`/lesson/${id}`);
      if (response.status === 200) {
        dispatch(deleteLessonByFilter(id));
      } else {
        dispatch(setStatus(Status.Error));
      }
    } catch (error) {
      dispatch(setStatus(Status.Error));
    }
  };
}
