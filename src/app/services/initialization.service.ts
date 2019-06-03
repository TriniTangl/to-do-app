import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {GroupItem, HttpErrorResponse} from '../interfaces';
import {LocalStorageService} from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class InitializationService {
    private readonly dataLink: string;
    private readonly storageName: string;

    constructor(
        private http: HttpClient,
        private router: Router) {
        this.storageName = 'TasksDB';
        this.dataLink = '/assets/api/tasks.json';
    }

    public initializeData(): Observable<any> {
        if (LocalStorageService.checkData(this.storageName) === false) {
            return this.http.get(this.dataLink, {})
                .pipe(
                    map((response: Array<GroupItem>) => {
                        LocalStorageService.setData(this.storageName, response);
                    }),
                    catchError((error: HttpErrorResponse | any) => {
                        console.error(`Status: ${error.status}\nMessage: ${error.message}`);
                        this.router.navigate(['/404']);
                        return throwError(error);
                    })
                );
        } else {
            return of({});
        }
    }
}
