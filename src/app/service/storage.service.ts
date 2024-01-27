import { Injectable } from '@angular/core';
import {Tokens} from "../interface/tokens";
import {Route, Router} from "@angular/router";
import {routes} from "../app.routes";

const TOKEN_KEY = 'auth-token';
const REFRESH_KEY = 'auth-refresh';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private router: Router) { }

  saveTokens(token: Tokens): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.setItem(TOKEN_KEY, token.accessToken);
    localStorage.setItem(REFRESH_KEY, token.refreshToken);
  }

  getToken(): any {
    return localStorage.getItem(TOKEN_KEY);
  }

  getRefresh(): any {
    return localStorage.getItem(REFRESH_KEY);
  }

  saveUser(user: any): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  public getUser(): any {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  logOut(): void {
    localStorage.clear();
    location.reload();
    this.router.navigate(['/login']).then(r => true);
  }

  public isLoggedIn(): boolean {
    const user = localStorage.getItem(USER_KEY);
    return user !== null;
  }
}
