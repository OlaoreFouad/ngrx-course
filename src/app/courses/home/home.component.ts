import { CoursesEntityService } from "./../services/courses-entity.service";
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
  promoTotal$: Observable<number>;

  beginnerCourses$: Observable<Course[]>;
  intermediateCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(
    private dialog: MatDialog,
    private coursesEntityService: CoursesEntityService
  ) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    const response$ = this.coursesEntityService.entities$;

    this.beginnerCourses$ = response$.pipe(
      map((courses) =>
        courses.filter((course) => course.category == "BEGINNER")
      )
    );

    this.intermediateCourses$ = response$.pipe(
      map((courses) =>
        courses.filter((course) => course.category == "INTERMEDIATE")
      )
    );

    this.advancedCourses$ = response$.pipe(
      map((courses) =>
        courses.filter((course) => course.category == "ADVANCED")
      )
    );

    this.promoTotal$ = response$.pipe(
      map((courses) => courses.filter((course) => course.promo).length)
    );
  }

  onAddCourse() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: "Create Course",
      mode: "create",
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }
}
