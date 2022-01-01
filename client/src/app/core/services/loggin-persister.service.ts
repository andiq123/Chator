import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, firstValueFrom, ReplaySubject } from 'rxjs';
import { User } from 'src/app/shared/models/user.interface';
import { environment } from 'src/environments/environment';
import { TokenStorageHelper } from '../helpers/token-storage.helper';
import { SignalrService } from './signalr.service';

@Injectable({ providedIn: 'root' })
export class LogginPersisterService {
  private loggedUserSource: ReplaySubject<User | null> =
    new ReplaySubject<User | null>();
  public LoggedUser = this.loggedUserSource.asObservable();

  private baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private signalrService: SignalrService
  ) {}

  setLoggedUser(userParam: User | null = null) {
    if (userParam) {
      return this.loggedUserSource.next(Object.assign(new User(), userParam));
    }
    return this.http
      .get<User>(`${this.baseUrl}/users/loggedUser`)
      .pipe(
        catchError((err: any) => {
          TokenStorageHelper.removeAccessToken();
          this.loggedUserSource.next(null);
          throw err;
        })
      )
      .subscribe((user) => {
        if (user) {
          this.loggedUserSource.next(Object.assign(new User(), user));
        }
      });
  }

  async signOut() {
    this.signalrService.disconnect();
    TokenStorageHelper.removeAccessToken();
    this.loggedUserSource.next(null);
    this.router.navigate(['/auth/login']);
  }
}
