import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, ReplaySubject } from 'rxjs';
import { User } from 'src/app/shared/models/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class LogginPersisterService {
  private loggedUserSource: ReplaySubject<User | null> =
    new ReplaySubject<User | null>();
  public LoggedUser = this.loggedUserSource.asObservable();

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) {}

  setLoggedUser(userParam: User | null = null) {
    if (userParam) {
      return this.loggedUserSource.next(Object.assign(new User(), userParam));
    }
    return this.http
      .get<User>(`${this.baseUrl}/users/loggedUser`)
      .pipe(
        catchError((err: any) => {
          localStorage.removeItem('token');
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

  addSignalrConnectionId(connectionId: string) {
    this.LoggedUser.subscribe((user) => {
      if (user) {
        user.signalrConnectionId = connectionId;
        this.loggedUserSource.next(user);
        console.log(user);
      }
    });
  }

  signOut() {
    localStorage.removeItem('token');
    this.loggedUserSource.next(null);
    this.router.navigate(['/auth/login']);
  }
}
