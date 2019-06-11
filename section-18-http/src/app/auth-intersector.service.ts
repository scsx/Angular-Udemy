import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

// The interceptor will run code before the requests leave our app, like ex: auth code, so it's not run on every request type
// After it will let the code continue, therefore the return
// after declaring on app.module (see there) no more action is needed, angular will run this on every request

export class AuthIntersectorService implements HttpInterceptor{
    intercept( originalReq: HttpRequest<any>, next: HttpHandler ) {
        console.log("Request is on it's way [I'm an intersector]");

        // use req.url on an if/else for example to control which request we are in anf then, below, return 'originalReq' or 'modifiedRequest'

        console.log(originalReq.url);
        // we can change the request:
        const modifiedRequest = originalReq.clone({
            headers: originalReq.headers.append('Auth', 'someStuff') // append to KEEP original headers
            /* MORE EXAMPLES
            url: 'some new url',
            params: ...
            */
        });
        // NEEDS to return so the flow continues
        // return next.handle(originalReq); // ORIGINAL
        return next.handle(modifiedRequest).pipe(tap( event => {
            if (event.type === HttpEventType.Response) {
                console.log('Response arrived, body data: ');
                console.log(event.body);
            }
        }));
        // OUR OWN MODIFIED; now checking console>network>(request)>headers ; Auth: someStuff will be there
        // pipe is optional and, unlike the above actions that intersect BEFORE the request, will intersect the response, AFTER
    }
}