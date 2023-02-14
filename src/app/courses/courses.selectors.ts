import { createSelector } from "@ngrx/store";
import { createFeatureSelector } from "@ngrx/store";

import * as fromCourses from "./reducers/courses.reducers";
import { CoursesState } from "./reducers/courses.reducers";

export const selectCoursesState =
  createFeatureSelector<CoursesState>("courses");

// select all
export const selectAllCourses = createSelector(
  selectCoursesState,
  fromCourses.selectAll
);

// select beginner
export const selectBeginnerCourses = createSelector(
  selectAllCourses,
  (courses) => courses.filter((course) => course.category === "BEGINNER")
);

// select advanced
export const selectAdvancedCourses = createSelector(
  selectAllCourses,
  (courses) => courses.filter((course) => course.category === "ADVANCED")
);

// select promo total
export const selectPromoTotal = createSelector(
  selectAllCourses,
  (courses) => courses.filter((course) => course.promo).length
);

// select courses loaded state
export const areCoursesLoaded = createSelector(
  selectCoursesState,
  (state) => state.allCoursesLoaded
);
