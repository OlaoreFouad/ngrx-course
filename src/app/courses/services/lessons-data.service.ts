import { HttpUrlGenerator, QueryParams } from "@ngrx/data";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Lesson } from "./../model/lesson";
import { DefaultDataService } from "@ngrx/data";
import { Observable } from "rxjs";
export class LessonsDataService extends DefaultDataService<Lesson> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super("Lesson", http, httpUrlGenerator);
  }
}
