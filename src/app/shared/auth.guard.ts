import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {

  let authService = inject(AuthService);
  let router = inject(Router);

  // Si ça renvoie true alors on peut activer la route
  return authService.isAdmin().then(
    (auth) => {
      if (auth) {
        console.log('authGuard: accès autorisé');
        return true;
      } else {
        console.log('authGuard: accès refusé');
        router.navigate(['/dashboard']);
        return false;
      }
    }
  );
};
