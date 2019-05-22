import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    constructor(private routerInstance: Router) {}

    ngOnInit() {}

    onLoadServer(id: number) {
        // do some stuff before navigate
        console.log("I did stuff and I will leave");
        //console.log(this.routerInstance);
        this.routerInstance.navigate(['/servers', id, 'edit'], { queryParams: { allowEdit: 1 }, fragment: "hash"});
        // é o mesmo que:
        //this.routerInstance.navigate( [this.routerInstance.config[2].path] );
    }
}
