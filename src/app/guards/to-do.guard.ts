import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {LocalStorageService} from '../services/local-storage.service';
import {GroupItem} from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class ToDoGuard implements CanActivate {
    private readonly storageName: string;

    constructor(private router: Router) {
        this.storageName = 'TasksDB';
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const groups: Array<GroupItem> = LocalStorageService.getData(this.storageName);
        if (Boolean(groups) === false) {
            this.router.navigate(['/groups']);
            return false;
        } else if (Boolean(groups[groups.findIndex(item => item.id === route.params.id)])) {
            return true;
        } else {
            this.router.navigate(['/404']);
            return false;
        }
    }
}
