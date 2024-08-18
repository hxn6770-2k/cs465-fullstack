import { Injectable, Provider } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

      var isAuthAPI: boolean;

      // Determine if the request is for authentication APIs
      if (request.url.startsWith('login') || request.url.startsWith('register')) {
        isAuthAPI = true;
      } else {
        isAuthAPI = false;
      }

      // If the user is logged in and the request is not for authentication, add the JWT token to the headers
      if (this.authenticationService.isLoggedIn() && !isAuthAPI) {
        let token = this.authenticationService.getToken();
        const authReq = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Auth Header:', authReq.headers.get('Authorization')); // Log the Authorization header
        return next.handle(authReq);
      }


      // If no changes are needed, pass the request as it is
      return next.handle(request);
  }
}

// Export the provider to include the interceptor in the HTTP chain
export const authInterceptProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true
};
