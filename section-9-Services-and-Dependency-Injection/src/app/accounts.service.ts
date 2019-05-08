import { LoggingService } from "./logging.service";
import { Injectable, EventEmitter } from "@angular/core";

// aula 104
// AppModule -> Same INSTANCE of Service is available Application-Wide
// AppComponent -> Same INSTANCE of Service is available for ALL Components (but not for other services)
// Any other component -> Same INSTANCE of Service is available for the Component and ALL its children components
// Ao ter várias instâncias do serviço não estava a funcionar - foi preciso comentar em 'providers'

@Injectable() // // 106. Injecting Services into Services; It is now considered a good practice to have allways injectable in services

export class AccountsService {

    accounts = [{
            name: 'Master Account',
            status: 'active'
        },
        {
            name: 'Testaccount',
            status: 'inactive'
        },
        {
            name: 'Hidden Account',
            status: 'unknown'
        }
    ];

    statusUpdated = new EventEmitter<string>();

    constructor(private loggingService: LoggingService) {} // 106. Injecting Services into Services

    addAccount(name: string, status: string) {
        this.accounts.push({ name: name, status: status });
        this.loggingService.logStatusChange(status);
    }

    updateStatus(id: number, status: string) {
        this.accounts[id].status = status;
        this.loggingService.logStatusChange(status);
    }
}