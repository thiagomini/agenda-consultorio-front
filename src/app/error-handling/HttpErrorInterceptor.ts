import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
   } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogService } from './error-dialog/error-dialog.service';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(public errorDialogService: ErrorDialogService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
        .pipe(
            catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
            if (error.error instanceof ErrorEvent) {
                // client-side error
                errorMessage = `Error: ${error.error.message}`;
            } else {
                // server-side error
                let parsedErrorBody = '';
                Object.keys(error.error.errors).forEach(key => {
                    parsedErrorBody += key + ': \n' + error.error.errors[key].join(', ')
                })
                errorMessage = `${parsedErrorBody}`;
            }
            const data = {
                message: errorMessage,
                status: error.status,
                errors: error.error.errors
            }
            this.errorDialogService.openDialog(data);
            return throwError(errorMessage);
            })
        )
    }

}