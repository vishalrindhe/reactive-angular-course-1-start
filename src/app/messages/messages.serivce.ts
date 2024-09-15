import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { filter } from "rxjs/operators";

@Injectable()
export class MessagesService{
    showNessages= new BehaviorSubject<string[]>([])
    errors$ = this.showNessages.asObservable().pipe(
        filter(messages => messages && messages.length > 0)
    )
    showErrors(...errors:string[]){
        this.showNessages.next(errors)
    }
}