import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/shared/models/user.interface';
import { environment } from 'src/environments/environment';
import { TokenStorageHelper } from '../helpers/token-storage.helper';

@Injectable({ providedIn: 'root' })
export class LogginPersisterService {
  private loggedUserSource = new BehaviorSubject<User | null>(null);
  public LoggedUser$ = this.loggedUserSource.asObservable();

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) {}

  setLoggedUser(userParam: User | null = null) {
    if (userParam) {
      this.loggedUserSource.next(Object.assign(new User(), userParam));
    }
    this.http.get<User>(`${this.baseUrl}/users/loggedUser`).subscribe({
      next: (user) => {
        this.loggedUserSource.next(Object.assign(new User(), user));
      },
      error: (err) => {
        TokenStorageHelper.removeAccessToken();
        this.loggedUserSource.next(null);
      },
    });
  }

  async signOut() {
    TokenStorageHelper.removeAccessToken();
    this.loggedUserSource.next(null);
    this.router.navigate(['/auth/login']);
  }
}
