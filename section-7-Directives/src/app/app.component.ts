import {
    Component
} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    //numbers = [1, 2, 3, 4, 5];
    oddNumbers = [1, 3, 5];
    evenNumbers = [2, 4];
    onlyOdd = false;
    valueForNgSwitch = 10;

    /* Tests */
    location:string = "--";
    path: Array<string> = [];
    readRainbow(event: any): void { // estava MouseEvent em vez de any mas dava erro "Property 'path' does not exist on type 'MouseEvent'."
        this.location = event.clientX;
        this.path = event.path;
        //console.log(event);
    }
}
