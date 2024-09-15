import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { MessagesService } from "../messages/messages.serivce";
import { LoadingService } from "../loading/loading.service";
import { HttpClient } from "@angular/common/http";
import { catchError, map, shareReplay, tap } from "rxjs/operators";

@Injectable({
    providedIn : 'root'
})
export class CoursesStoreService {
    private subject = new BehaviorSubject<Course[]>([])
    courses$ = this.subject.asObservable()
    constructor(
        private messagesService: MessagesService,
        private loadingService: LoadingService,
        private http: HttpClient
    ){
        this.loadAllCourses()
    }
    private loadAllCourses(){
        const loadCourses$ = this.http.get<Course[]>('/api/courses')
        .pipe(
            map(courses => courses?.['payload']),
            catchError(err =>{
                const error = 'Could not load courses'
                this.messagesService.showErrors(error)
                console.log(error, err);
                return throwError(err)
            }),
            tap(courses => this.subject.next(courses))
        )
        this.loadingService.showLoaderUntilCompleted(loadCourses$).subscribe()
    }
    saveCourse(courseId:string, changes : Partial<Course>):Observable<any>{
        const courses = this.subject.getValue()
        const index=  courses.findIndex(r => r.id = courseId)
        const newCourse:Course = {
            ...courses[index],
            ...changes
        }
        const newCourses:Course[] = courses.slice(0)
        newCourses[index] = newCourse
        this.subject.next(newCourses)
        return this.http.put(`/api/courses/${courseId}`, changes)
        .pipe(
            catchError(err =>{
                const error = 'Could not save changes'
                this.messagesService.showErrors(error)
                console.log(err,error);
                return throwError(err)
            }),
            shareReplay()
        )
    }
    filterByCategory(category :String):Observable<Course[]>{
        return this.courses$
        .pipe(
            map(courses =>
                courses.filter(rr => rr.category == category).sort(sortCoursesBySeqNo)
            )
        )
    }
}