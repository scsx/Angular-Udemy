import { HttpRequest, HttpInterceptor, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

// this interceptor does nothing but console.log, to test multiple interceptors
export class LoggingIntersectorService implements HttpInterceptor{
    intercept( originalReq: HttpRequest<any>, next: HttpHandler ) {
        console.log('Outgoing request');
        return next.handle(originalReq).pipe(tap(evt => {
            if ( evt.type === HttpEventType.Response) {
                console.log('Incoming response');
                console.log(evt.body);
            }
        }));
    }
}