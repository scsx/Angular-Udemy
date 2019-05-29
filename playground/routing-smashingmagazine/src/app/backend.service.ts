import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';

@Injectable({
    providedIn: 'root'
})
export class BackendService implements InMemoryDbService {

    constructor() {}

    createDb() {
        let contacts = [{
                id: 1,
                name: 'Cole Alexander',
                email: 'cole@blacklips.com'
            },
            {
                id: 2,
                name: 'Jared Swilley',
                email: 'jared@blacklips.com'
            },
            {
                id: 3,
                name: 'Oakley Munson',
                email: 'oakley@blacklips.com'
            },
            {
                id: 4,
                name: 'Zumi Rosow',
                email: 'zumi@blacklips.com'
            }
        ];
        return {
            contacts
        };

    }
}
