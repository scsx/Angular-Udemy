import { Component, OnInit } from '@angular/core';
import { AccountsService } from './accounts.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
    //providers: [AccountsService] // passado para app.module para estar disponível em toda a app
})
export class AppComponent implements OnInit {
    
    accounts: {name: string, status: string}[] = [];

    constructor(private accountsServiceArgument: AccountsService) {
    }

    ngOnInit() {
        this.accounts = this.accountsServiceArgument.accounts;
    }
}
