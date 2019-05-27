import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroupListComponent} from './group-list/group-list.component';
import {ToDoListComponent} from './to-do-list/to-do-list.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {ToDoGuard} from './guards/to-do.guard';

const routes: Routes = [
{path: '', pathMatch: 'full', redirectTo: 'groups'},
{path: 'groups', component: GroupListComponent},
{path: 'groups/:id', component: ToDoListComponent, canActivate: [ToDoGuard]},
{path: '404', component: NotFoundComponent},
{path: '**', component: NotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
