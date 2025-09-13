import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiErrorHandler {

    handleError<T>(operation = 'operation', result?: T) {
        return (error: HttpErrorResponse): Observable<T> => {
            this.sendToRemoteLogging(operation, error);
            return of(result as T);
        };
    }

    private sendToRemoteLogging(operation: string, error: HttpErrorResponse): void {
        // Aqui você pode implementar a lógica para enviar os logs para um serviço remoto
        // como Application Insights, Sentry, etc.
        const errorLog = {
            operation,
            message: error.message,
            status: error.status,
            statusText: error.statusText,
            url: error.url,
            timestamp: new Date().toISOString(),
            stack: error.error?.stack,
            environment: environment.production ? 'production' : 'development'
        };

        // TODO: Implementar chamada para serviço de log remoto
        if (!environment.production) {
            //console.log('Error log payload:', errorLog);
        }
    }

}