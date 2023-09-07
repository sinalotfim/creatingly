import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {
	handleError(error: any): void {
		if (error instanceof Error) {
			// Sentry.captureException(error);
		} else if (![500, 504, 401, 403].includes(error?.status)) {
			// Sentry.captureException(new Error(JSON.stringify(error)));
		} else {
			// console.error('🚫🚫🚫 -------- 🤬🤬🤬\n\r', error);
		}
	}
}
