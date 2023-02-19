import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Course } from "./../model/course";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Observable } from "rxjs";

@Injectable()
export class CoursesDataService extends DefaultDataService<Course> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super("Course", http, httpUrlGenerator);
  }

  getAll(): Observable<Course[]> {
    return this.http
      .get<{ payload: Course[] }>("/api/courses")
      .pipe(map((res) => res.payload));
  }
}
