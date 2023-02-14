import { Course } from "./model/course";
import { Action, createAction, props } from "@ngrx/store";

export const LOAD_COURSES_REQUEST = "[Courses Page] Load Courses Request";
export const LOAD_COURSES_SUCCESS = "[Courses Page] Load Courses Success";

export const LoadCoursesRequest = createAction(LOAD_COURSES_REQUEST);

export const LoadCoursesSuccess = createAction(
  LOAD_COURSES_SUCCESS,
  props<{ courses: Course[] }>()
);

/*
export class LoadCoursesRequest implements Action {
  public readonly type: string = LOAD_COURSES_REQUEST;

  constructor() {}
}

export class LoadCoursesSuccess implements Action {
  public readonly type: string = LOAD_COURSES_SUCCESS;

  constructor(public payload: { courses: Course[] }) {}
}*/
