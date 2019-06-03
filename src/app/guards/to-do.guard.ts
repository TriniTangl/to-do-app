import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LocalStorageService} from '../services/local-storage.service';
import {InitializationService} from '../services/initialization.service';

@Injectable({
    providedIn: 'root'
})
export class ToDoGuard implements CanActivate {
    private readonly storageName: string;

    constructor(
        private localStorageService: LocalStorageService,
        private initializationService: InitializationService,
        private router: Router) {
        this.storageName = 'TasksDB';
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.initializationService.initializeData()
            .pipe(
                map(() => {
                    if (this.localStorageService.getData().findIndex(item => item.id === Number(route.params.id)) > -1) {
                        return true;
                    } else {
                        this.router.navigate(['/404']);
                        return false;
                    }
                })
            );
    }
}
