import {Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
import { CoursesService } from '../courses.service';
import { LoadingService } from '../loading/loading.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;


  constructor(private coursesService:CoursesService, private dialog: MatDialog, private loadingService:LoadingService) {

  }

  ngOnInit() {
    this.reloadData()
    
  }

  reloadData(){
    this.loadingService.loadingOn()
    const courses$ = this.coursesService.loadAllCourses()
    .pipe(
      map(r => r.sort(sortCoursesBySeqNo))
    )
    let loadeeCourse$ = this.loadingService.showLoaderUntilCompleted<Course[]>(courses$)
    this.beginnerCourses$ = loadeeCourse$
    .pipe(
      map(c => c.filter((r:any) => r.category == 'BEGINNER'))
    )
    this.advancedCourses$ = loadeeCourse$
    .pipe(
      map(c => c.filter((r:any) => r.category == 'ADVANCED'))
    )
  }

}




