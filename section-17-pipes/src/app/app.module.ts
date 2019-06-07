import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ShortenPipe } from './shorten.pipe';
import { FilterPipe } from './filter.pipe';
import { ExerciseReversePipe } from './exercisereversepipe.pipe';
import { SortAlphaExercise } from './sortalphaexercise.pipe';

@NgModule({
    declarations: [
        AppComponent,
        ShortenPipe, // PIPE
        FilterPipe, // PIPE
        ExerciseReversePipe, // PIPE
        SortAlphaExercise // PIPE
    ],
    imports: [
        BrowserModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
