import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Saving} from "../shared/Saving";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SavingService {

  constructor(private http: HttpClient) {
  }


  getAllSavings(): Observable<Saving[]> {
    const httpOptions: { headers: HttpHeaders } = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.get<Saving[]>('http://localhost:8080/api/savings', httpOptions);
  }

  addSaving(saving: Saving): Observable<any> {
    const httpOptions: { headers: HttpHeaders } = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.post('http://localhost:8080/api/saving/add', saving, httpOptions);
  }

  deleteSaving(id: number | null): Observable<string> {
    const httpOptions: { headers: HttpHeaders } = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    if (id === null) {
      console.log('Id not found');
      return of("Not found");
    } else {
      return this.http.delete(`http://localhost:8080/api/saving/${id}`, {
        ...httpOptions,
        responseType: 'text'
      });
    }
  }

  updateSaving(saving: Saving): Observable<object> {
    const httpOptions: { headers: HttpHeaders } = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.put(`http://localhost:8080/api/saving/${saving.id}`, saving, httpOptions);
  }
}
