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
    if (
      route?.routeConfig?.path === 'auth' &&
      !TokenStorageHelper.getAccessToken()
    ) {
      return of(true);
    } else if (
      route?.routeConfig?.path === 'auth' &&
      TokenStorageHelper.getAccessToken()
    ) {
      this.router.navigate(['/dashboard']);
    } else if (TokenStorageHelper.getAccessToken()) {
      return of(true);
    }
    return of(false);
    // return this.logginPersister.LoggedUser$.pipe(
    //   map((user) => {
    //     return !!user;
    //   })
    // );
  }
}
