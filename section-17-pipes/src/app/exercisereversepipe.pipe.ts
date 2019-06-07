import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'reverseExercise'
})
export class ExerciseReversePipe implements PipeTransform {
    transform(value: any): any {
        function reverseString(value) {
            return (value === '') ? '' : reverseString(value.substr(1)) + value.charAt(0);
        }
        return reverseString(value);
    }

    // solution:
    /*
    transform(value: any): any {
        return value.split('').reverse().join(''); 
    }
    */
}
// USAGE {{ server.instanceType | uppercase | reverseExercise }