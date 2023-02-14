import { areCoursesLoaded } from "./../courses.selectors";
import { LoadCoursesRequest } from "./../courses.actions";
import { tap, first, map, finalize, filter } from "rxjs/operators";
import { AppState } from "./../../reducers/index";
import { select, Store } from "@ngrx/store";
import { Course } from "./../model/course";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class CoursesResolver implements Resolve<Course[]> {
  loading = false;

  constructor(private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      select(areCoursesLoaded),
      tap((coursesLoaded) => {
        if (!this.loading && !coursesLoaded) {
          this.store.dispatch(LoadCoursesRequest());
          this.loading = true;
        }
      }),
      filter((coursesLoaded) => coursesLoaded),
      first(),
      finalize(() => {
        this.loading = false;
      })
    );
  }
}
