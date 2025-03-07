import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

export const PrefixApiInterceptorInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  
  const ANGULAR_BASE_URL = environment.apiUrl;

  if (!req.url.includes('http:') && !req.url.includes('https:')) {
    req = req.clone({
      url: ANGULAR_BASE_URL + req.url
    })
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      alert(error.message)
      return throwError(() => new Error(error.message))
    })
  );

};