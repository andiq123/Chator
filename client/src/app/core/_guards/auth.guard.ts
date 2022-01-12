import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { TokenStorageHelper } from '../helpers/token-storage.helper';
import { LogginPersisterService } from '../services/loggin-persister.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private logginPersister: LogginPersisterService,
    private router: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    //conditions
    const isLoggedIn = TokenStorageHelper.getAccessToken();

    const isNotLoggedAndEntersLoginPage =
      route?.routeConfig?.path === 'auth' &&
      !TokenStorageHelper.getAccessToken();

    const isLoggedAndEntersLoginPage =
      route?.routeConfig?.path === 'auth' &&
      TokenStorageHelper.getAccessToken();

    if (isNotLoggedAndEntersLoginPage) {
      return of(true);
    } else if (isLoggedAndEntersLoginPage) {
      this.router.navigate(['/dashboard']);
    } else if (isLoggedIn) {
      return of(true);
    }
    this.router.navigate(['/']);
    return of(false);
  }
}
