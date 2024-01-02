import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../shared/User";
import {Summary} from "../shared/Summary";

@Injectable({
    providedIn: 'root'
})
export class UserService{

    constructor(private http: HttpClient) {
    }



    getUser() {
       const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            })
        };
        return this.http.get<User>('http://localhost:8080/api/user', httpOptions);
    }

    getStatistics() {
       const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            })
        };
        return this.http.get<Summary>('http://localhost:8080/api/user/statistics', httpOptions);
    }

    updateUser(user: User) {
       const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            })
        };
        return this.http.put('http://localhost:8080/api/user', user, httpOptions);
    }
}
