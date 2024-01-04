import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";

export const authGuard: CanActivateFn = (): boolean => {
  const authenticationService: AuthenticationService = inject(AuthenticationService);
  const router: Router = inject(Router);
  if (authenticationService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['']);
    return false;
  }
}
