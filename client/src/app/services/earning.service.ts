import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Earning} from "../shared/Earning";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EarningService {

  constructor(private http: HttpClient) {
  }

  getAllEarnings(): Observable<Earning[]> {
    const httpOptions: { headers: HttpHeaders } = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.get<Earning[]>('http://localhost:8080/api/earnings', httpOptions);
  }

  addEarnings(earnings: Earning[]): Observable<object> {
    const httpOptions: { headers: HttpHeaders } = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.post('http://localhost:8080/api/earning/add', earnings, httpOptions);
  }

  deleteEarning(id: number | null): Observable<string> {
    const httpOptions: { headers: HttpHeaders } = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    if (id === null) {
      console.log('Id not found');
      return of('Not found.');
    } else {
      return this.http.delete(`http://localhost:8080/api/earning/${id}`, {
        ...httpOptions,
        responseType: 'text'
      });
    }
  }

  updateEarning(earning: Earning): Observable<object> {
    const httpOptions: { headers: HttpHeaders } = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    const currEarning: Earning = {
      id: earning.id,
      date: earning.date,
      source: earning.source,
      amount: earning.amount
    }
    return this.http.put(`http://localhost:8080/api/earning/${earning.id}`, currEarning, httpOptions)
  }
}
