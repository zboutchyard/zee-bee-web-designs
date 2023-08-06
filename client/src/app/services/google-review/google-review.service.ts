import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GoogleReviewService {
    constructor(private http: HttpClient) {}
    getReviews(): Observable<any> {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
        };
        let url = `http://localhost:3000/getReviews`;
        return this.http.get(`${url}`, httpOptions).pipe(
            catchError((err) => {
                throw 'review service failed' + err;
            })
        );
    }
}
