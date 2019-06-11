import { Post } from './post.model';
import { PostsService } from './posts.service';

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    
    loadedPosts: Post[] = [];
    isFetching = false;
    hasError = null;

    private fetchAndShowPosts() {
        this.isFetching = true;
        this.postsService.fetchPosts()
        .subscribe(
            posts => {
            this.isFetching = false;
            this.loadedPosts = posts;
            },
            // simulated error by denying 'read' on Firebase 'Rules'
            error => {
                this.hasError = error.message;
                this.isFetching = false;
                //console.log(error);
            }
        );
    }
    constructor(private http: HttpClient, private postsService: PostsService) {}

    ngOnInit() {
        this.fetchAndShowPosts();
    }

    // send http request, called on (ngSubmit)
    onCreatePost(postData: Post) { // post was defined in post.model.ts
        this.postsService.createAndStorePost(postData.title, postData.content).subscribe( (rep) => {
            // this code will only run if create happened
            this.fetchAndShowPosts();
            console.log(rep);
        });
    }

    onFetchPosts() {
        this.fetchAndShowPosts();
    }

    onClearPosts() {
        this.postsService.deletePosts().subscribe( () => {
            // reset array here because this code will only run if delete happened
            this.loadedPosts = [];
        });
    }

    onHandleError() {
        this.hasError = null;
    }

}
