import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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
  addEarnings(earnings:Earning[]){
    return this.http.post('http://localhost:8080/api/earning/add',earnings,this.httpOptions);
  }

  deleteEarning(id: number | null) {
    if(id === null){
      console.log('Id not found');
      return null;
    }else{
      return this.http.delete(`http://localhost:8080/api/earning/${id}`, {
        ...this.httpOptions,
        responseType: 'text'
      });
    }
  }
  updateEarning(earning:Earning){
    const currEarning:Earning = {
      id:earning.id,
      date:earning.date,
      source:earning.source,
      amount:earning.amount
    }
    return this.http.put(`http://localhost:8080/api/earning/${earning.id}`,currEarning,this.httpOptions)
  }
}
