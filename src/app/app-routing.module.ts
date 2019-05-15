import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {GroupListComponent} from './group-list/group-list.component';
import {ToDoListComponent} from './to-do-list/to-do-list.component';
import {NotFoundComponent} from './not-found/not-found.component';

const routes: Routes = [
    {path: '', component: AppComponent},
    {path: 'groups', component: GroupListComponent},
    {path: 'groups/:id', component: ToDoListComponent},
    {path: '**', component: NotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
