import { CoursesHttpService } from "./services/courses-http.service";
import { Observable } from "rxjs";
import { concatMap, map, switchMap, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import {
  EDIT_COURSE_REQUEST,
  LoadCoursesSuccess,
  LOAD_COURSES_REQUEST,
  EditCourseRequest,
  EditCourseSuccess,
} from "./courses.actions";
import { CoursesActions } from "./courses.action-types";

@Injectable()
export class CoursesEffect {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesHttpService
  ) {}

  public loadCoursesRequest$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.LoadCoursesRequest),
      concatMap((_) => this.coursesService.findAllCourses()),
      map((courses) => LoadCoursesSuccess({ courses }))
    )
  );

  public updateCourseRequest$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.EditCourseRequest),
      concatMap((action) => {
        return this.coursesService.saveCourse(action.id, action.updatedCourse);
      }),
      map((course) => EditCourseSuccess({ newCourse: course, id: course.id }))
    )
  );
}
