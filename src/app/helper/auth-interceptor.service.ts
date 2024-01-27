import {Injectable} from '@angular/core';
import {
  HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {catchError, EMPTY, Observable, retry, switchMap, throwError} from "rxjs";
import {AuthService} from "../service/auth.service";
import {StorageService} from "../service/storage.service";
import {Refresh} from "../interface/refresh";
import {Tokens} from "../interface/tokens";
import {Router} from "@angular/router";
import {error} from "@angular/compiler-cli/src/transformers/util";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService,
              private storageService: StorageService,
              private http: HttpClient,
              private router: Router) {
  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.storageService.getToken();
    if (!token && !req.url.includes("/auth/signin") && !req.url.includes("/auth/signup")) {
      this.router.navigate(['/login']).then(r => true)
      return EMPTY;
    }

    let request = req.clone();
    if (token && !req.url.includes("/auth/refresh")) {
      request = req.clone({setHeaders: {Authorization: `Bearer ${token}`}});
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        const refresh = this.storageService.getRefresh()

        if (err.status === 401 && refresh != null) {
          this.authService.refresh(refresh).subscribe({
            next: tokens => this.storageService.saveTokens(tokens),
            error: () => this.storageService.logOut()
          });
          const refreshRequest = req.clone(
            {setHeaders: {Authorization: `Bearer ${this.storageService.getToken()}`}}
          );
          return next.handle(refreshRequest);
        } else {
          return throwError(() => {
            this.router.navigate(['/login']).then(r => true)
            return EMPTY;
          });
        }
      }))
  }
}

export const authInterceptorProvider = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
];

