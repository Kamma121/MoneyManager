import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  signIn(email: string, password: string) {
    return this.http.post('http://localhost:8080/api/auth/authenticate', {email, password});
  }

  signUp(firstName: string, lastName: string, email: string, password: string) {
    return this.http.post('http://localhost:8080/api/auth/register', {firstName, lastName, email, password});
  }
}
