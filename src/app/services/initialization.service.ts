import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {HttpErrorResponse} from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class InitializationService {
    private dataLink: string = '/ass/ets/api/tasks.json';

    constructor(private http: HttpClient) {
    }

    public getInitialData(): Observable<any> {
        return this.http.get(this.dataLink, {})
            .pipe(
                map(response => response),
                catchError((error: HttpErrorResponse | any) => {
                    console.error(`Status: ${error.status}\nMessage: ${error.message}`);
                    return throwError(error);
                })
            );
    }
}
