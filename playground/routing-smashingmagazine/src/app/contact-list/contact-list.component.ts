import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';

@Component({
    selector: 'app-contact-list',
    templateUrl: './contact-list.component.html'
})
export class ContactListComponent implements OnInit {

    contacts: any[] = [];

    constructor( private ctctService: ContactService ) {}

    ngOnInit() {

        this.ctctService.getContacts().subscribe(
            (data: any[]) => {
                console.log(data);
                this.contacts = data;
            }
        )

    }

}
