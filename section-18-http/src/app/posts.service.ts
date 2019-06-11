import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Post } from './post.model';
import { Subject, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    // not used, see class 262. Using Subjects for Error Handling
    // can be used if error is important across the app
    errorSubject = new Subject<string>();

    constructor(private http: HttpClient) {}

    // CREATE POST
    createAndStorePost(titleArg: string, contentArg: string) {
        const postData: Post = { title: titleArg, content: contentArg};
        return this.http.post<{ name: string }>( // <...> (optional) defines Type of response - we'll get BACK a name: string
            'https://angular-udemy-http-section.firebaseio.com/posts.json', // url
            postData, // body. Angular converts this to json
            { // (optional) get full response, console.logged at the cpt, when subscribed; gives headers, status, etc
                observe: 'response'
            }
        // without subscribe() we don't have a response and, by design, Angular doesn't even send the request.
        // It was here and was moved to the component by my decision so a function could be called.
        // Tried to keep it here, subscribe(), and in the component but the cpt one was being ignored and triggered an error
        )
    }

    // GET POSTS
    fetchPosts() {
        // return an observable to be subscribed on component
        return this.http
        // <...> (optional) defines Type of response, it could also be done on the pipe:
        .get<{ [key: string]: Post }>(
            'https://angular-udemy-http-section.firebaseio.com/posts.json',
            {   // (optional)
                headers: new HttpHeaders({ 'custom-header': 'Hello' }), // set headers
                params: new HttpParams().set('print', 'pretty'), // set params: ...firebaseio.com/posts.json?print=pretty
                responseType: 'json' // default is json; this is where you could change to text and parse yourself (very very rare)
            }
        )
        //.pipe( map( (responseData: { [key: string]: Post }) => {
        .pipe( map( responseData => {// Operator map’s job is to transform things; operators always return observables
            const postsArray: Post[] = [];
            for (const key in responseData) {
                if ( responseData.hasOwnProperty(key)) { // check if we're not accessing some property of a prototype
                    postsArray.push( {...responseData[key], id: key} );
                }
            }
            return postsArray;
        }),
        catchError( errorRes => {
            // send to analytics server, etc
            return throwError(errorRes); // throwError is an observable
        }))

        // subscribe was here but no data was passed; the return was added up here and subscribe is made on component
    }

    // DELETE POSTS
    deletePosts() {
        return this.http.delete(
            'https://angular-udemy-http-section.firebaseio.com/posts.json',
            { // (optional)
                observe: 'events',
                responseType: 'text' // default is json
            }
        ).pipe(tap( event => {
            console.log(event);
            // There's a few type numbers for different situations, upload, download, sent, etc:
            if (event.type === HttpEventType.Sent) { // type = 0
                // give feedback to the user or something
            }
            if (event.type === HttpEventType.Response) { // type = 4
                console.log(event.body);
            }
        }))
    }

}