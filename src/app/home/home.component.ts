import {Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
import { CoursesService } from '../services/courses.service';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.serivce';
import { CoursesStoreService } from '../services/courses.store';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;


  constructor(
    private dialog: MatDialog, 
    // private coursesService:CoursesService, 
    // private loadingService:LoadingService, 
    // private messagesService: MessagesService,
    private courseStore :CoursesStoreService
  ) {

  }

  ngOnInit() {
  //   console.log(this.loadingService.aaa);
  //   this.loadingService.aaa = '1'
  // console.log('home component...');
  // console.log(this.loadingService.aaa);
    this.reloadData()
    
  }

  reloadData(){
    // const courses$ = this.coursesService.loadAllCourses()
    // .pipe(
    //   map(r => r.sort(sortCoursesBySeqNo)),
    //   catchError(err =>{
    //     const error = 'Could not load courses'
    //     this.messagesService.showErrors(error)
    //     console.log(error, err);
    //     return throwError(err)
        
        
    //   })
    // )
    // let loadeeCourse$ = this.loadingService.showLoaderUntilCompleted<Course[]>(courses$)
    this.beginnerCourses$ = this.courseStore.filterByCategory('BEGINNER')
    this.advancedCourses$ = this.courseStore.filterByCategory('ADVANCED')
  }

}




