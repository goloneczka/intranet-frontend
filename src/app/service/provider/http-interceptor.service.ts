import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar,
              private authService : AuthenticationService,
              private router : Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(response => {
        if (response.status === 401) {
          this.authService.logout();
          this.router.navigate(['/'])
            .then(_ => {
              this.displaySnackBar('Nastapilo wylogowanie ze wzgledów bezpieczeństwa', 'error');
              return throwError(response);
            });
        }

        this.displaySnackBar(response.error?.message, 'error');
        return throwError(response);
      }));
  }

  private displaySnackBar(message : string, cssClass : string) {
    this.snackBar.open(message, '', {
      duration: 5000,
      panelClass: [cssClass]
    })
  }
}
