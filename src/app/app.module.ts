import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AngularMaterialModule} from './angular-material/angular-material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {GroupComponent} from './group/group.component';
import {GroupEditComponent} from './group-edit/group-edit.component';
import {GroupListComponent} from './group-list/group-list.component';
import {ToDoComponent} from './to-do/to-do.component';
import {ToDoEditComponent} from './to-do-edit/to-do-edit.component';
import {ToDoListComponent} from './to-do-list/to-do-list.component';
import {FloatingButtonComponent} from './floating-button/floating-button.component';
import {NotFoundComponent} from './not-found/not-found.component';

@NgModule({
    declarations: [
        AppComponent,
        GroupComponent,
        GroupListComponent,
        GroupEditComponent,
        ToDoComponent,
        ToDoEditComponent,
        ToDoListComponent,
        FloatingButtonComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularMaterialModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
