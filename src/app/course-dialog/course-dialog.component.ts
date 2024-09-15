import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import moment from 'moment';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import { CoursesService } from '../courses.service';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.serivce';
import { CoursesStoreService } from '../courses.store';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css'],
    providers : [LoadingService, MessagesService]
})
export class CourseDialogComponent implements OnInit, AfterViewInit {

    form: FormGroup;

    course:Course;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course:Course,
    private coursesStoreService: CoursesStoreService,
    private loadingService : LoadingService,
private messagesService:MessagesService) {    
        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription,Validators.required]
        });

    }
    ngOnInit(): void {
        console.log(this.loadingService.aaa);
        this.loadingService.aaa = '1'
      console.log('course dialog component...');
      console.log(this.loadingService.aaa);
    }

    ngAfterViewInit() {

    }

    save() {
      const changes = this.form.value;
      let saveCourse$ = this.coursesStoreService.saveCourse(this.course.id,changes).subscribe()
    //   let loaderCourse$ = this.loadingService.showLoaderUntilCompleted(saveCourse$)
      this.dialogRef.close()

    //   loaderCourse$.subscribe(
    //     (val) =>{
    //         this.dialogRef.close(val)
    //     }
    //   )

    }

    close() {
        this.dialogRef.close();
    }

}
