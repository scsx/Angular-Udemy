import { Component } from '@angular/core';
import { LoggingService } from '../logging.service';
import { AccountsService } from '../accounts.service';

@Component({
    selector: 'app-new-account',
    templateUrl: './new-account.component.html',
    styleUrls: ['./new-account.component.css'],
    providers: [/*LoggingService , AccountsService */] // NOTICE THIS, service class name // AccountsService removed because too many instances // LoggingService removed class 106. Injecting Services into Services
})
export class NewAccountComponent {
    

    constructor(private loggingService: LoggingService, // has to be the service class name
                private accountsService: AccountsService) {
                    this.accountsService.statusUpdated.subscribe(
                        (status: string) => console.warn('SUBSCRIBED SERVICE SAYS: New status is ' + status)
                    );
    }

    onCreateAccount(accountName: string, accountStatus: string) {
        this.accountsService.addAccount(accountName, accountStatus);
        //this.loggingService.logStatusChange(accountStatus); // removed class 106. Injecting Services into Services
    }
}
