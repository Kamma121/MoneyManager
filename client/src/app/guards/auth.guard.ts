import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";

export const authGuard: CanActivateFn = (route, state) => {
    const authenticationService = inject(AuthenticationService);
    const router = inject(Router);
    if(authenticationService.isAuthenticated()){
      return true;
    }else{
      router.navigate(['']);
      return false;
    }
}
