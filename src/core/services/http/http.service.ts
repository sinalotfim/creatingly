import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { HttpExtra } from '../../models/http.model';

@Injectable({
	providedIn: 'root'
})
export class HttpService {
	constructor(private readonly http: HttpClient) {}

	get<T>(url: string, options?: any, extra?: HttpExtra): Observable<T> {
		return this.http.get<T>(url, options).pipe(
			retry({
				count: extra?.maxRetry ?? 0,
				delay: extra?.retryDelayMs ?? 1000
			}),
			catchError(error => this.handleError(error))
		);
	}

	post<T>(url: string, body?: any, options?: any, extra?: HttpExtra): Observable<T> {
		return this.http.post<T>(url, body, options).pipe(
			retry({
				count: extra?.maxRetry ?? 0,
				delay: extra?.retryDelayMs ?? 1000
			}),
			catchError(error => this.handleError(error))
		);
	}

	put<T>(url: string, body?: any, options?: any, extra?: HttpExtra): Observable<T> {
		return this.http.put<T>(url, body, options).pipe(
			retry({
				count: extra?.maxRetry ?? 0,
				delay: extra?.retryDelayMs ?? 1000
			}),
			catchError(error => this.handleError(error))
		);
	}

	delete<T>(url: string, options?: any, extra?: HttpExtra): Observable<T> {
		return this.http.delete<T>(url, options).pipe(
			retry({
				count: extra?.maxRetry ?? 0,
				delay: extra?.retryDelayMs ?? 1000
			}),
			catchError(error => this.handleError(error))
		);
	}

	private handleError(error: HttpErrorResponse): Observable<any> {
		return throwError(() => error.error);
	}
}
