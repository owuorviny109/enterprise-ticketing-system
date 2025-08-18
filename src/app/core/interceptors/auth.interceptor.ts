import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  
  // Get the auth token from the service
  const authToken = authService.getToken();
  
  // If we have a token, clone the request and add the authorization header
  if (authToken) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });
    
    console.log('🔐 Adding auth token to request:', req.url);
    return next(authReq);
  }
  
  // If no token, proceed with the original request
  return next(req);
};