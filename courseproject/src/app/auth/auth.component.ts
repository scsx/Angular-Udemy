import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService, IAuthResponse } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder-for-dynamic-alert/placeholder.directive';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {

    constructor(
        private authService: AuthService,
        private router: Router,
        private cptFactoryRes: ComponentFactoryResolver // to create cpts dynamically
    ) {}

    isLoginMode = true;
    isLoading = false;
    hasError: string = null;

    @ViewChild( PlaceholderDirective, { static: false} ) alertHost: PlaceholderDirective;

    private closeSub: Subscription;

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    // this method will be used to SIGN UP and SIGN IN (  if (this.isLoginMode)  )
    onSubmit(form: NgForm) {
        // users could hack the html and submit the form; this if/else prevents that
        if (!form.valid) {
            return;
        }
        // get values from form
        const email = form.value.email;
        const password = form.value.password;

        // Because this observable would be subscribed on Login AND on Sign Up it was moved to this variable; this way is only subscribed once (see below) and the value is assigned to the var on each case (a)
        let authObservable: Observable<IAuthResponse>;
        
        this.isLoading = true; // loading starts here, show spinner

        if (this.isLoginMode) {
            authObservable = this.authService.login(email, password) // (a) subscribe was here, without the authObservable = 

        } else {
            authObservable = this.authService.signup(email, password) // (a) subscribe was here, without the authObservable = 
        }

        authObservable.subscribe(  // (a) subscribe is made only once here
            resData => {
                //console.log(resData);
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            errorMessage => {
                // logic for error handling was moved to the service; there, pipe and catchError return an observable with an error message that we've already subscribed here (ideally not the error one, the success one but in case of error we get it here because of pipe)
                console.log(errorMessage);
                this.hasError = errorMessage;
                this.showErrorAlert(errorMessage); // show dynamic cpt programmatically
                this.isLoading = false;
            }
        );

        form.reset();
    }

    // comes from alert cpt as Output; resets error so the modal closes
    onHandleError() {
        this.hasError = null;
    }

    ngOnDestroy() {
        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }
    }

    private showErrorAlert(msg: string) {
        const alertCptFactory = this.cptFactoryRes.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(alertCptFactory);

        // with instance we can access the properties of the alert cpt (message & close)
        componentRef.instance.message = msg;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        });
    }

}
