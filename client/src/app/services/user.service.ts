import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../shared/User";
import {Summary} from "../shared/Summary";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }


  getUser(): Observable<User> {
    const httpOptions: { headers: HttpHeaders } = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.get<User>('http://localhost:8080/api/user', httpOptions);
  }

  getStatistics(): Observable<Summary> {
    const httpOptions: { headers: HttpHeaders } = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.get<Summary>('http://localhost:8080/api/user/statistics', httpOptions);
  }

  updateUser(user: User): Observable<any> {
    const httpOptions: { headers: HttpHeaders } = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.put('http://localhost:8080/api/user', user, httpOptions);
  }
}
