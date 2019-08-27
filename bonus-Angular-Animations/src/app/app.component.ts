import { Component } from '@angular/core';
import {
trigger,
state,
style,
animate,
transition,
keyframes,
group
} from '@angular/animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    animations: [
        // DIVs
        trigger('myDivState', [
                state('sleeping', style({
                    'background-color': 'grey', // - or camelCase (backgroundColor)
                    transform: 'translateX(0)'
                })),
                state('awake', style({
                    'background-color': 'red', // - or camelCase (doesnt have to be the same from above but it's better)
                    transform: 'translateX(100px)'
                })),
                transition('sleeping => awake', animate(300)),
                transition('awake => sleeping', animate(100))
                // if the time is the same:
                // transition('sleeping <=> awake', animate(300))
            ]
        ),
        trigger('wildState', [
                state('sleeping', style({
                    'background-color': 'grey',
                    transform: 'translateX(0) scale(1)'
                })),
                state('awake', style({
                    'background-color': 'red',
                    transform: 'translateX(100px) scale(1)'
                })),
                state('shrunken', style({
                    'background-color': 'green',
                    transform: 'translateX(0px) scale(0.5)'
                })),
                transition('sleeping => awake', animate(300)),
                transition('awake => sleeping', animate(800)),
                /* transition('shrunken <=> *', animate(500, style({ // * any state
                    borderRadius: '50px'
                })))  */ // this jumps and doesnt look good
                transition('shrunken <=> *', [ // array with phases of animation
                    style({
                        backgroundColor: 'orange'
                    }),
                    animate(1000, style({
                        borderRadius: '50px',
                    })),
                    animate(500) // transition to the end state
                ])
            ]
        ),
        // LIST 1 (left)
        trigger('list1', [
                state('inTheDOM', style({ // the state name in this case is irrelevant
                    opacity: 1,
                    transform: 'translateX(0)'
                })),
                transition('void => *', [  // void is reserved for elements not yet in the DOM
                    style({ // this is the initial state (void)
                        opacity: 0,
                        transform: 'translateX(-100px)'
                    }),
                    animate(300)
                ]),
                transition('* => void', [
                    animate(300, style({
                        opacity: 0,
                        transform: 'translateX(100px)'
                    }))
                ])
            ]
        ),
        // LIST 2 (right)
        trigger('list2', [
                state('inTheDOM', style({
                    opacity: 1,
                    transform: 'translateX(0)'
                })),
                transition('void => *', [
                    animate(1000, keyframes([
                        style({
                            transform: 'translateX(-100px)',
                            opacity: 0,
                            offset: 0 // timing of this animation
                        }),
                        style({
                            transform: 'translateX(-50px)',
                            opacity: 0.5,
                            offset: 0.3 // timing of this animation is 0.3% (of 1000 defined above)
                        }),
                        style({
                            transform: 'translateX(-20px)',
                            opacity: 1,
                            offset: 0.8
                        }),
                        style({
                            transform: 'translateX(0px)',
                            opacity: 1,
                            offset: 1
                        })
                    ]))
                ]),
                transition('* => void', [
                    group([ // group groups animations to occur at the same time
                        animate(300, style({
                            color: 'red',
                            background: 'white'
                        })),
                        animate(500, style({
                            opacity: 0,
                            transform: 'translateX(100px)'
                        }))
                    ])
                ])
            ]
        )
    ]
})

export class AppComponent {

    myState = 'sleeping';
    wildState = 'sleeping';

    listStatus = '';
    list = ['Milk', 'Sugar', 'Bread', 'Juice', 'Cars from Sweden'];

    onAnimate() {
        this.myState == 'sleeping' ? this.myState = 'awake' : this.myState = 'sleeping';
        this.wildState == 'sleeping' ? this.wildState = 'awake' : this.wildState = 'sleeping';
    }

    onShrink() {
        this.wildState = 'shrunken';
        console.log(this.wildState);
    }

    onAdd(item) {
        this.list.push(item);
        this.listStatus = 'updated';
    }

    onDelete(item) {
        this.list.splice(this.list.indexOf(item), 1);
        this.listStatus = 'updated';
    }

    animationStarted(evt) {
        console.log(evt);
    }

    animationEnded(evt) {
        console.log(evt);
    }

}
