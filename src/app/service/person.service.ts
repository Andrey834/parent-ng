import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Signin} from "../interface/signin";
import {Observable} from "rxjs";
import {Person} from "../interface/person";

const AUTH_API = 'http://superu.tplinkdns.com:8080/person/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  getCurrentPerson(): Observable<Person> {
    return this.http.get<Person>(AUTH_API + 'current', httpOptions);
  }
}
