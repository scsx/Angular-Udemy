import { Component,Input } from '@angular/core';
import { LoggingService } from '../logging.service';
import { AccountsService } from '../accounts.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
    providers: [/*LoggingService , AccountsService */] // NOTICE THIS, service class name // AccountsService removed because too many instances // LoggingService removed class 106. Injecting Services into Services
})
export class AccountComponent {
    @Input() account: {
        name: string,
        status: string
    };

    @Input() id: number;

    constructor(private loggingService: LoggingService,  // has to be the service class name
                private accountsService: AccountsService) { // has to be the service class name
    }

    onSetTo(status: string) {
        this.accountsService.updateStatus(this.id, status);
        //this.loggingService.logStatusChange(status); // removed class 106. Injecting Services into Services
        this.accountsService.statusUpdated.emit(status);
    }
}
