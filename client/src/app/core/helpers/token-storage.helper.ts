export class TokenStorageHelper {
  constructor() {}

  static getAccessToken(): string {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }

  static setAccessToken(token: string, rememberMe = false): void {
    if (rememberMe) localStorage.setItem('token', token);
    else sessionStorage.setItem('token', token);
  }

  static removeAccessToken(): void {
    if (localStorage.getItem('token')) localStorage.removeItem('token');
    if (sessionStorage.getItem('token')) sessionStorage.removeItem('token');
  }
}
