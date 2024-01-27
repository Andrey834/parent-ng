import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Signin} from "../interface/signin";
import {Signup} from "../interface/signup";

const AUTH_API = 'http://superu.tplinkdns.com:8080/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(auth: Signin): Observable<any> {
    return this.http.post(AUTH_API + 'signin', auth, httpOptions);
  }

  register(person: Signup): Observable<any> {
    return this.http.post(AUTH_API + 'signup', person, httpOptions);
  }

  refresh(token: any): Observable<any> {
    return this.http.post(AUTH_API + 'refresh', {token: token}, httpOptions);
  }
}
