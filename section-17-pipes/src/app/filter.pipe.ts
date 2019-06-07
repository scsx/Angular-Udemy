import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {

    // value will be an ARRAY here
    // example call: ( the array item, 'written stuff on input', 'status' )
    transform(value: any, filterString: any, propName: string): any {
        /*
        console.log( value );
        console.log( "filterString: " + filterString );
        console.log( "propName: " + propName );
        */
        if (value.length === 0 || filterString === '') {
            return value;
        }

        const resultArray = [];
        for (const item of value) {
            if (item[propName] === filterString) {
                resultArray.push(item);
            }
        }

        return resultArray;
    }

}
