import { Course } from "./model/course";
import { Action, createAction, props } from "@ngrx/store";

export const LOAD_COURSES_REQUEST = "[Courses Page] Load Courses Request";
export const LOAD_COURSES_SUCCESS = "[Courses Page] Load Courses Success";
export const EDIT_COURSE_REQUEST = "[Courses Page] Edit Course Request";
export const EDIT_COURSE_SUCCESS = "[Courses Page] Edit Course Success";
export const EDIT_COURSE_FAILED = "[Courses Page] Edit Course Failed";

export const LoadCoursesRequest = createAction(LOAD_COURSES_REQUEST);

export const LoadCoursesSuccess = createAction(
  LOAD_COURSES_SUCCESS,
  props<{ courses: Course[] }>()
);

export const EditCourseRequest = createAction(
  EDIT_COURSE_REQUEST,
  props<{ id: number; updatedCourse: Course }>()
);

export const EditCourseSuccess = createAction(
  EDIT_COURSE_SUCCESS,
  props<{ id: number; newCourse: Course }>()
);
