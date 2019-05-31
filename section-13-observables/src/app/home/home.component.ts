import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {

    contador: number;

    // ###1 CUSTOM OBSERVABLE WITH { interval, Subscription } from 'rxjs';
    // the subscription keeps emitting to the console if we navigate away; coming back creates a new one!
    // need to unsubscribe and first we keep it in a var:
    private customObs: Subscription;

    // ###2 CUSTOM OBSERVABLE FROM SCRATCH
    private customFromScratch: Subscription;

    constructor() { }

    ngOnInit() {
        // ###1 SUBSCRIBE, now in a var
        this.customObs = interval(1500).subscribe( contador => {
            console.log("rxjs interval: " + contador);
            this.contador = contador;
        });

        // ###2 CUSTOM OBSERVABLE FROM SCRATCH
        // define
        const customIntervalObs = Observable.create( observer => {
            let newContador = 0;
            setInterval( () => {
                observer.next(newContador); // emits new value
                // simulate complete:
                if ( newContador === 2) {
                    observer.complete(); // comment this to see error below
                }
                // simulate error:
                if ( newContador > 3) {
                    observer.error( new Error('I invented an error: count is > 3!') );
                }
                newContador++;
            }, 1500);
        });
        

        // start and pass 3 arguments, data, error and completion
        // a) without operators:
        //this.customFromScratch = customIntervalObs.subscribe( theData => ...
        // b) with operators, pipes before subscribe:
        this.customFromScratch = customIntervalObs.pipe(
            filter( (dataForPipe) => { return dataForPipe > 0 }),
            map( (data: number) => { return 'Round #' + (data + 1) })
        ).subscribe(
            theData => {
                console.log(theData);
            },
            theError => {
                console.log("custom error: " +  theError);
                alert(theError.message);
            },
            () => {
                console.log("completed!");
                // This message WON'T SHOW in case of ERROR
                // Error CANCELS the observable, doesn not COMPLETE it
            }
        );
    }

    ngOnDestroy(): void {
        // ###1 UNSUBSCRIBE
        this.customObs.unsubscribe();
        // ###2 UNSUBSCRIBE
        this.customFromScratch.unsubscribe();
    }

    removeSub() {
        // unsubscribe both, on click
        this.customObs.unsubscribe();
        this.customFromScratch.unsubscribe();
    }

}
