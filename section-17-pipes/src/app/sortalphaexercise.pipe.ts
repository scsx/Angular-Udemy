import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'sortalpha',
    pure: false
})
export class SortAlphaExercise implements PipeTransform {
    transform(value: Object): any {
        value.sort(
            (a, b) => {
                var textA = a.name.toUpperCase();
                var textB = b.name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        return value;
    }
}
// <li *ngFor="let server of servers | filter:filteredStatus:'status' | sortalpha " [ngClass]="getStatusClasses(server)">