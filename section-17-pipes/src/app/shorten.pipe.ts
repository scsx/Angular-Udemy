import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'shorten' // name to use in template
})
// PipeTransform is not mandatory but a good practice
export class ShortenPipe implements PipeTransform {

    // PipeTransform requires transform method that should have a return
    transform(value: any, limit: number) {
        if ( value.length > limit) {
            return value.substr(0, limit) + '...';
        }
        return value;
    }

}