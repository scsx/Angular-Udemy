import { Injectable, EventEmitter } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: "root" // can be provided here instead of "providers" in app.module
})

export class UserService {
    
    activatedEmitter = new EventEmitter<boolean>();

    activatedSubject = new Subject<boolean>();

}