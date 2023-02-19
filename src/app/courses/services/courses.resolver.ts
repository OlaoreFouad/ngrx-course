import { filter, first, map, tap } from "rxjs/operators";
import { CoursesEntityService } from "./courses-entity.service";
import { Course } from "./../model/course";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class CoursesResolver implements Resolve<boolean> {
  constructor(private coursesEntityService: CoursesEntityService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.coursesEntityService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.coursesEntityService.getAll();
        }
      }),
      filter((loaded) => !!loaded),
      first()
    );
  }
}
