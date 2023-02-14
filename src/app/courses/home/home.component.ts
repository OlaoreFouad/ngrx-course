import {
  selectAdvancedCourses,
  selectBeginnerCourses,
  selectPromoTotal,
} from "./../courses.selectors";
import { AppState } from "./../../reducers/index";
import { Store } from "@ngrx/store";
import { Component, OnInit } from "@angular/core";
import { compareCourses, Course } from "../model/course";
import { Observable } from "rxjs";
import { defaultDialogConfig } from "../shared/default-dialog-config";
import { EditCourseDialogComponent } from "../edit-course-dialog/edit-course-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { map, shareReplay } from "rxjs/operators";
import { CoursesHttpService } from "../services/courses-http.service";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  promoTotal$: Observable<number> = this.store.select(selectPromoTotal);

  loading$: Observable<boolean>;

  beginnerCourses$: Observable<Course[]> = this.store.select(
    selectBeginnerCourses
  );

  advancedCourses$: Observable<Course[]> = this.store.select(
    selectAdvancedCourses
  );

  constructor(private dialog: MatDialog, private store: Store<AppState>) {}

  ngOnInit() {}

  reload() {}

  onAddCourse() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: "Create Course",
      mode: "create",
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }
}
