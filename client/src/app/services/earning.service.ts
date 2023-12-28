import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Expense} from "../shared/Expense";
import {Earning} from "../shared/Earning";

@Injectable({
  providedIn: 'root'
})
export class EarningService {

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
  };

  getAllEarnings(){
    return this.http.get<Earning[]>('http://localhost:8080/api/earnings',this.httpOptions);
  }
}
