import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {LocalStorageService} from '../services/local-storage.service';
import {InitializationService} from '../services/initialization.service';
import {GroupItem, HttpErrorResponse} from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class ToDoGuard implements CanActivate {
    private readonly storageName: string;

    constructor(
        private router: Router,
        private initializationService: InitializationService) {
        this.storageName = 'TasksDB';
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let groups: Array<GroupItem>;
        if (LocalStorageService.checkData(this.storageName) === false) {
            this.initializationService.getInitialData()
                .subscribe(
                    (data: Array<GroupItem>) => {
                        LocalStorageService.setData(this.storageName, data);
                    },
                    (error: HttpErrorResponse) => {
                        console.error(`Status: ${error.status}\nMessage: ${error.message}`);
                    }
                );
        }
        groups = LocalStorageService.getData(this.storageName);
        if (Boolean(groups[groups.findIndex(item => item.id === Number(route.params.id))])) {
            return true;
        } else {
            this.router.navigate(['/404']);
            return false;
        }
    }
}
