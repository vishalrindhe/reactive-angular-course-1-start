import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "../model/course";
import { map, shareReplay } from "rxjs/operators";
import { Lesson } from "../model/lesson";

@Injectable({
    providedIn:'root'
})
export class CoursesService{

    constructor(private http:HttpClient){}

    loadAllCourses():Observable<Course[]>{
        return this.http.get<Course[]>('/api/courses')
        .pipe(
            map((r:any) => r?.['payload']),
            shareReplay()
        )
    }

    saveCourse(courseId:string, changes : Partial<Course>):Observable<any>{
        return this.http.put(`/api/courses/${courseId}`, changes)
        .pipe(
            shareReplay()
        )
    }
    searchLessons(val: string):Observable<Lesson[]>{
        return this.http.get('/api/lessons',{
            params : {
                filter : val,
                pageSize : '100'
            }
        }).pipe(
            map(res => res?.['payload']),
            shareReplay()
        )
    }
    loadCourseById(id: number):Observable<Course>{
        return this.http.get<Course>(`/api/courses/${id}`)
        .pipe(
            shareReplay()
        )
    }
    loadAllLessonsByCourseId(val: number):Observable<Lesson[]>{
        return this.http.get('/api/lessons',{
            params : {
                courseId : val.toString(),
                pageSize : '10000'
            }
        }).pipe(
            map(res => res?.['payload']),
            shareReplay()
        )
    }

}