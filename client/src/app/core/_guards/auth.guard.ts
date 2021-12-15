import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { LogginPersisterService } from '../services/loggin-persister.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private logginPersister: LogginPersisterService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (route?.routeConfig?.path == 'auth' && !localStorage.getItem('token')) {
      return true;
    } else if (
      route?.routeConfig?.path == 'auth' &&
      localStorage.getItem('token')
    ) {
      this.router.navigate(['/dashboard']);
      return false;
    } else if (!localStorage.getItem('token')) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    return this.logginPersister.LoggedUser.pipe(
      map((user) => {
        return !!user;
      })
    );
  }
}
