import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { User } from 'src/app/shared/models/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class LogginPersisterService {
  private loggedUserSource: ReplaySubject<User | null> =
    new ReplaySubject<User | null>();
  public LoggedUser = this.loggedUserSource.asObservable();

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) {}

  setLoggedUser() {
    return this.http
      .get<User>(`${this.baseUrl}/users/loggedUser`)
      .subscribe((user) => {
        this.loggedUserSource.next(user);
      });
  }

  signOut() {
    localStorage.removeItem('token');
    this.loggedUserSource.next(null);
    this.router.navigate(['/auth/login']);
  }
}
