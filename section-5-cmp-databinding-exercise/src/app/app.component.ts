import { Component, OnInit } from '@angular/core'; // OnInit change title (extra)
import { Title }     from '@angular/platform-browser'; // change title (extra)

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { // OnInit change title (extra)

    public constructor(private titleService: Title ) { } // change title (extra)

    oddNumbers: number[] = [];
    evenNumbers: number[] = [];

    onIntervalFired(firedNumber: number) {
        
        if (firedNumber % 2 === 0) {
            this.evenNumbers.push(firedNumber);
        } else {
            this.oddNumbers.push(firedNumber);
        }
    }

    public setTitle() {
        this.titleService.setTitle( "Odds & Evens" );
    }

    ngOnInit() { // change title (extra)
        this.setTitle();
    }
}
