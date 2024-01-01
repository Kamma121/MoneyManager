import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
  }

  signIn(email: string, password: string) {
    return this.http.post('http://localhost:8080/api/auth/authenticate', {email, password});
  }

  signUp(firstName: string, lastName: string, email: string, password: string) {
    return this.http.post('http://localhost:8080/api/auth/register', {firstName, lastName, email, password});
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

}
