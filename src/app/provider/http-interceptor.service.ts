import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(response => {
        if (response.status === 401) {
          // this.authService.logout();
          return throwError(response);
        }

        this.snackBar.open(response.error, '', {
          duration: 5000,
          panelClass: ['error']
        })

        return throwError(response);
      }));
  }
}
