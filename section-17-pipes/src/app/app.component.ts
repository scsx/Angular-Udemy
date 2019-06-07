import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    filteredStatus: string = '';

    servers = [{
            instanceType: 'medium',
            name: 'Hong Kong',
            status: 'stable',
            started: new Date(2010, 0, 1),
            desc: 'In the late 1990s, web servers were added to device servers'
        },
        {
            instanceType: 'large',
            name: 'San Francisco',
            status: 'stable',
            started: new Date(2013, 10, 2),
            desc: 'Dedicated servers are great!'
        },
        {
            instanceType: 'small',
            name: 'Xangai',
            status: 'offline',
            started: new Date(2015, 1, 1),
            desc: 'There are several reasons your organization might choose'
        },
        {
            instanceType: 'small',
            name: 'Lisbon',
            status: 'stable',
            started: new Date(2019, 0, 15),
            desc: 'Some companies choose a dedicated server to comply with regulations'
        },
        {
            instanceType: 'small',
            name: 'Santa Monica',
            status: 'critical',
            started: new Date(2022, 7, 30),
            desc: 'Budget pending'
        },
        {
            instanceType: 'large',
            name: 'Amsterdam',
            status: 'critical',
            started: new Date(2022, 0, 15),
            desc: 'Under construction'
        }
    ];

    getStatusClasses(
        server: {
            instanceType: string,
            name: string,
            status: string,
            started: Date,
            desc: string
        }) {
        return {
            'list-group-item-success': server.status === 'stable',
            'list-group-item-warning': server.status === 'offline',
            'list-group-item-danger': server.status === 'critical',
            'list-group-item-xxx': server.status === 'xxx'
        };
    }

    // simulate async pipe
    appStatus = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('stable');
        }, 2000);
    });

    // add server to test pure/impure
    count: number = 12;
    addServer() {
        this.count = this.count * 2;
        this.servers.push({
            instanceType: 'large',
            name: 'New Location',
            status: 'xxx',
            started: new Date(2025, 0, 15),
            desc: 'TBD' + this.count.toString()
        });
    }
}