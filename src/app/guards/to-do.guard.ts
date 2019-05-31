import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LocalStorageService} from '../services/local-storage.service';
import {InitializationService} from '../services/initialization.service';
import {GroupItem} from '../interfaces';

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
        if (LocalStorageService.checkData(this.storageName) === false) {
            return this.initializationService.getInitialData()
                .pipe(
                    map(data => {
                        LocalStorageService.setData(this.storageName, data);
                        return this.checkAccess(LocalStorageService.getData(this.storageName), route.params.id);
                    })
                );
        } else {
            return this.checkAccess(LocalStorageService.getData(this.storageName), route.params.id);
        }
    }

    private checkAccess(groupList: Array<GroupItem>, groupId: number): boolean {
        if (groupList.findIndex(item => item.id === groupId)) {
            return true;
        } else {
            this.router.navigate(['/404']);
            return false;
        }
    }
}
