import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {LocalStorageService} from "../local-storage.service";

export class BasicAuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (LocalStorageService.isAuthenticated()) {
      req = req.clone({
        headers: req.headers.append('Authorization', `Bearer ${LocalStorageService.getJwt()}`)
      });
    }
    return next.handle(req);
  }
}
