import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-contact-detail',
    templateUrl: './contact-detail.component.html'
})

export class ContactDetailComponent implements OnInit {

    contact: any;

    constructor(
    private ctctService: ContactService, 
    private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe(
            params => {
                console.log(params.get('id'));
                this.ctctService.getContact(params.get('id')).subscribe(
                    c => {
                        console.log(c);
                        this.contact = c;
                    }
                )
            }
        )
    }

}
