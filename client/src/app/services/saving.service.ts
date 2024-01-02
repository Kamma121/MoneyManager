import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Saving} from "../shared/Saving";

@Injectable({
  providedIn: 'root'
})
export class SavingService {

  constructor(private http: HttpClient) {
  }


  getAllSavings() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.get<Saving[]>('http://localhost:8080/api/savings', httpOptions);
  }

  addSaving(saving: Saving) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.post('http://localhost:8080/api/saving/add', saving, httpOptions);
  }

  deleteSaving(id: number | null) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    if (id === null) {
      console.log('Id not found');
      return null;
    } else {
      return this.http.delete(`http://localhost:8080/api/saving/${id}`, {
        ...httpOptions,
        responseType: 'text'
      });
    }
  }

  updateSaving(saving: Saving) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.put(`http://localhost:8080/api/saving/${saving.id}`, saving, httpOptions);
  }
}
