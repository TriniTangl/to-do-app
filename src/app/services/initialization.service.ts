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

    constructor(
        private localStorageService: LocalStorageService,
        private http: HttpClient,
        private router: Router) {
        this.dataLink = '/assets/api/tasks.json';
    }

    public initializeData(): Observable<any> {
        if (this.localStorageService.checkData()) {
            return of({});
        } else {
            return this.http.get(this.dataLink, {})
                .pipe(
                    map((response: Array<GroupItem>) => {
                        this.localStorageService.setData(response);
                    }),
                    catchError((error: HttpErrorResponse | any) => {
                        console.error(`Status: ${error.status}\nMessage: ${error.message}`);
                        this.router.navigate(['/404']);
                        return throwError(error);
                    })
                );
        }
    }
}
