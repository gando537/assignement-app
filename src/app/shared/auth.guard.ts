import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {

  let authService = inject(AuthService);
  let router = inject(Router);

  // Si ça renvoie true alors on peut activer la route
  return authService.isAdmin().then(
    (auth) => {
      const userLogin = authService.username;
      const listUser = authService.listUser;
      if (auth && userLogin !== '' && userLogin !== undefined && userLogin !== null && listUser.find(user => user.login === userLogin)!.role === 'admin' ) {
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

export const AuthGuardUser: CanActivateFn = (route, state) => {

  let authService = inject(AuthService);
  let router = inject(Router);

  // Si ça renvoie true alors on peut activer la route
  return authService.isLogged().then(
    (auth) => {
      if (auth && authService.username !== '') {
        console.log('authGuardUser: accès autorisé');
        return true;
      } else {
        console.log('authGuardUser: accès refusé');
        router.navigate(['/dashboard']);
        return false;
      }
    }
  );
}
