import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";

export class CustomValidators {

    static invalidSupervisor ( ctrl: FormControl): { [s: string]: boolean } {
        if ( ctrl.value === 'bob' ) { // bob
            return { 'wrongboss': true }
        }
        return null;
    }

    static AsyncInvalidSupervisor ( ctrl: FormControl): Promise<any> | Observable<any> {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                if ( ctrl.value === 'ted' ) { // ted, bob's brother
                    resolve( { 'wrongboss': true } );
                } else {
                    resolve(null);
                }
            }, 2000)
        })
        return promise;
    }
    
}