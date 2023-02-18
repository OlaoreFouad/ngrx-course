import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createAction, on } from "@ngrx/store";
import { createReducer } from "@ngrx/store";
import { CoursesActions } from "../courses.action-types";
import { compareCourses, Course } from "../model/course";

export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}

const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
});

export const initialCoursesState = adapter.getInitialState({
  allCoursesLoaded: false,
});

export const coursesReducer = createReducer(
  initialCoursesState,
  on(CoursesActions.LoadCoursesSuccess, (state, action) =>
    adapter.addMany(action.courses, { ...state, allCoursesLoaded: true })
  ),
  on(CoursesActions.EditCourseSuccess, (state, action) =>
    adapter.updateOne(
      { id: action.newCourse.id, changes: action.newCourse },
      state
    )
  )
);

export const { selectAll } = adapter.getSelectors();
