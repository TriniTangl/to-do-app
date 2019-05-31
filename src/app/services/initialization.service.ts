import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpErrorResponse} from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class InitializationService {
    private dataLink: string = '/assets/api/tasks.json';

    constructor(
        private http: HttpClient,
        private router: Router) {
    }

    public getInitialData(): Observable<any> {
        return this.http.get(this.dataLink, {})
            .pipe(
                map(response => response),
                catchError((error: HttpErrorResponse | any) => {
                    console.error(`Status: ${error.status}\nMessage: ${error.message}`);
                    this.router.navigate(['/404']);
                    return throwError(error);
                })
            );
    }
}
