import { Course } from "./model/course";
import { CoursesHttpService } from "./services/courses-http.service";
import { Observable } from "rxjs";
import { concatMap, map, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { LoadCoursesSuccess, LOAD_COURSES_REQUEST } from "./courses.actions";

@Injectable()
export class CoursesEffect {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesHttpService
  ) {}

  public loadCoursesRequest$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(LOAD_COURSES_REQUEST),
      concatMap((_) => this.coursesService.findAllCourses()),
      tap(console.log),
      map((courses) => LoadCoursesSuccess({ courses }))
    )
  );
}
