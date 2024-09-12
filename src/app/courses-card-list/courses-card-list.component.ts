import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../model/course';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'courses-card-list',
  standalone: false,
  templateUrl: './courses-card-list.component.html',
  styleUrl: './courses-card-list.component.scss'
})
export class CoursesCardListComponent {
@Input() courses : Course[] = []
@Output() coursesChanged = new EventEmitter<any>()
constructor(private dialog: MatDialog){}
editCourse(course: Course) {

  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "400px";

  dialogConfig.data = course;

  const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);
  dialogRef.afterClosed()
  .pipe(
    filter(val => !!val),
    tap(() => this.coursesChanged.emit())
  ).subscribe()

}
}
