import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LogginPersisterService } from 'src/app/core/services/loggin-persister.service';
import { AuthResponse } from 'src/app/shared/models/auth-response.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  baseUrl = environment.baseUrl;
  constructor(
    private http: HttpClient,
    private router: Router,
    private logginPersister: LogginPersisterService
  ) {}

  login(creds: {
    username: string;
    password: string;
  }): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/auth/login`, creds)
      .pipe(
        tap((data: AuthResponse) => {
          localStorage.setItem('token', data.token);
          this.logginPersister.setLoggedUser();
          this.router.navigate(['/dashboard']);
        })
      );
  }

  register(creds: {
    username: string;
    password: string;
  }): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/auth/register`, creds)
      .pipe(
        tap((data: AuthResponse) => {
          localStorage.setItem('token', data.token);
          this.logginPersister.setLoggedUser();
          this.router.navigate(['/dashboard']);
        })
      );
  }
}
